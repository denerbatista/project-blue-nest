import {
  Controller,
  Get,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna tempo de funcionamento da API',
  })
  getStatus(): string {
    return this.appService.getStatus();
  }

  @Get('stop/:token')
  @ApiOperation({
    summary: 'Paraliza o server',
  })
  getAppStop(@Param('token') token: string): void {
    if (token === process.env.INTERRUPTER_TOKEN) {
      console.log('Server paralyzed');
      process.kill(0, 'SIGINT');
    } else {
      console.log('token inválido');
    }
    throw new NotImplementedException();
  }
}

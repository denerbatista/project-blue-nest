import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomeService } from './home.service';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from 'src/users/entities/user.entity';
import { LoggedUser } from 'src/auth/decorators/loggeduser.decorator';

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna dados de homepage do usuário logado',
  })
  async home(@LoggedUser() user: IUser) {
    try {
      return await this.homeService.getHome(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

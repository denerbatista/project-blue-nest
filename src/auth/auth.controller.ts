import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from './decorators/loggeduser.decorator';
import { IUser } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { ResponseLoginDto } from './dto/responseLogin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Objeto com token e dados do usuário',
    type: ResponseLoginDto,
  })
  @ApiOperation({
    summary: 'Login com cpf ou email',
    description: 'Response.token must be used to allow access',
  })
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    try {
      const response: ResponseLoginDto = await this.authService.login(loginDto);
      delete response.user.password;
      return response;
    } catch (error) {
      throw new UnauthorizedException('Erro ao logar');
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna dados do usuário logado',
  })
  profile(@LoggedUser() user: IUser, @Res() res: Response): void {
    try {
      res.send(user);
    } catch (error) {
      res.status(400).send({ message: 'Não há usuário logado' });
    }
  }
}

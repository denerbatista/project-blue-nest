import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseLoginDto } from './dto/responseLogin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ cpf, email, password }: LoginDto): Promise<ResponseLoginDto> {
    const user: IUser = await this.prisma.users.findUnique({
      where: cpf ? { cpf } : { email },
    });

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    const validatorArray: boolean[] = [!user ? true : false, !passwordMatch];

    for (const check of validatorArray) {
      if (check) {
        throw new NotFoundException(
          cpf ? 'Cpf' : 'Email' + ' ou senha inválida ',
        );
      }
    }

    delete user.password;

    const token: string = this.jwtService.sign({ email: user.email });

    return { token, user };
  }
}

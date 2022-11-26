import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    {
      message: 'Email inválido',
    },
  )
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(11)
  @Matches(/^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/, {
    message: 'cpf inválido',
  })
  @ApiProperty()
  cpf: string;

  @IsBoolean()
  @ApiProperty()
  isAdmin: boolean;
}

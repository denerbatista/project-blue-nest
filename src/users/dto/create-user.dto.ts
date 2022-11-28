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
  @ApiProperty({
    example: 'user@mail.com',
  })
  @Matches(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    {
      message: 'Email inválido',
    },
  )
  email: string;

  @IsString()
  @ApiProperty({ example: 'name' })
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    example: '@Ab12345',
    description:
      'Senha deve conter 8 digitos, contendo: um simbolo, uma letra maiuscula e minuscula e um numero',
  })
  password: string;

  @IsString()
  @MinLength(11)
  @Matches(/^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/, {
    message: 'cpf inválido',
  })
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @IsBoolean()
  @ApiProperty()
  isAdmin: boolean;
}

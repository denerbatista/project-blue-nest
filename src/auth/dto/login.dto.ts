import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'user@mail.com',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(11, {
    message:
      'cpf inválido, deve ter 11 digitos com pontos e traços: 123.456.789-00',
  })
  @Matches(/^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/, {
    message:
      'cpf inválido, deve ter 11 digitos com pontos e traços: 123.456.789-00',
  })
  @ApiProperty({ example: '123.456.789-00' })
  cpf?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1234@Abcd',
  })
  password: string;
}

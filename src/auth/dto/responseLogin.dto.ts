import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { IUser } from 'src/users/entities/user.entity';

export class ResponseLoginDto {
  @ApiProperty({
    description: 'Login Token',
    example:
      'asiudjklasnafjlskcsmn80wrioklqaq3uoa.auisdjnklxc82839qiwdoascmkshureqwdjpasmkglçmefwjioahvunjsadlskmrlçwmefapjd.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: {
      id: '8cf10fad-4fc2-4eae-8821-8865000365e8',
      email: 'example@mail.com',
      name: 'name',
      password: '@Ab123456',
      cpf: '123.456.789-00',
      isAdmin: 'false',
    },
    description: 'Dados do Usuário',
  })
  @IsObject()
  user: IUser;
}

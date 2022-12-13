import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Administrador',
    description: 'Titulo do perfil',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://www.website.net/image.img',
    description: 'Link de imagem do perfil',
  })
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a3d1217c-4c98-11ed-bdc3-0242ac120002',
    description: 'Id do Usuário',
  })
  userId: string;
}

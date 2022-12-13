import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FavoriteProductDto {
  @ApiProperty({
    example: '79653a44-4019-11ed-b878-0242ac120002',
    description: 'Favoritando o ID do usuário',
  })
  @IsString()
  profileId: string;

  @ApiProperty({
    example: '79653a44-4019-11ed-b878-0242ac120000',
    description: 'ID do produto favorito',
  })
  @IsString()
  products: string;
}

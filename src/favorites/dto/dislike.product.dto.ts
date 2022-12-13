import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DislikeProductDto {
  @ApiProperty({
    example: '79653a44-4019-11ed-b878-0242ac120002',
    description: 'ID favorito',
  })
  @IsString()
  favoriteId: string;
}

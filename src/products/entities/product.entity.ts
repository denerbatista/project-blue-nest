import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

export class Product extends UpdateProductDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsObject()
  favorites: Favorite[];
}

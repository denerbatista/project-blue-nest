import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

export class Favorite {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsObject()
  product?: Product;

  @ApiProperty()
  @IsObject()
  profile?: Profile;
}

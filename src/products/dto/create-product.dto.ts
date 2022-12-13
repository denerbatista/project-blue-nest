import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Titulo do produto',
    example: 'Banana',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Ano do produto',
    example: '2026',
  })
  @IsString()
  year: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Fruta amarela rica em potácio',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'url da imagem',
    example: 'l1nq.com/bananas',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Avaliação do produto',
    example: 8.0,
  })
  @IsNumber()
  score: GLfloat;
}

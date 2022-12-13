import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsAdmin } from 'src/auth/decorators/isAdmin.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard(), IsAdmin)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Registre um novo produto',
  })
  async create(@Body() dto: CreateProductDto) {
    try {
      return await this.productService.create(dto);
    } catch (error) {
      throw new BadRequestException('Erro ao criar produto');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista um produto por ID',
  })
  async findbyId(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productService.findById(id);
    } catch (error) {
      throw new BadRequestException('Erro ao encontrar produto');
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os produtos',
  })
  async findAll(): Promise<Product[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar produtos');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualize um produto por ID',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productService.update(id, dto);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar produto');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete um produto por ID',
  })
  delete(@Param('id') id: string): void {
    try {
      this.productService.delete(id);
    } catch (error) {
      throw new BadRequestException('Erro ao deletar produto.');
    }
  }
}

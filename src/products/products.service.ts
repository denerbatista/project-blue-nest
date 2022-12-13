import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.products.findMany({
      include: { favorites: true },
    });
  }

  async findById(id: string) {
    const product = await this.prisma.products.findUnique({
      where: { id },
      include: { favorites: true },
    });

    if (!product) {
      throw new NotFoundException(`${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    return await this.prisma.products.create({ data: dto });
  }

  async update(id: string, dto: UpdateProductDto) {
    return await this.prisma.products.update({
      where: { id },
      data: dto,
      include: { favorites: true },
    });
  }

  async delete(id: string) {
    await this.prisma.products.delete({
      where: { id },
    });
  }
}

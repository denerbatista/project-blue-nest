import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Favorite } from './entities/favorite.entity';
import { FavoriteProductDto } from './dto/favorite.product.dto';
import { DislikeProductDto } from './dto/dislike.product.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyIdAndReturnProductFav(favoriteId: string): Promise<Favorite> {
    const favorite: Favorite | null = await this.prisma.favorites.findUnique({
      where: { id: favoriteId },
    });

    return favorite;
  }

  async favoriteProduct(dto: FavoriteProductDto): Promise<Favorite> {
    const data: Prisma.FavoritesCreateInput = {
      profile: {
        connect: {
          id: dto.profileId,
        },
      },
      products: {
        connect: {
          id: dto.products,
        },
      },
    };
    return await this.prisma.favorites.create({
      data,
    });
  }

  async getProfileFavorites(id: string): Promise<Favorite[]> {
    return await this.prisma.favorites.findMany({
      where: { profileId: id },
      include: { products: true },
    });
  }

  async dislikeProduct({ favoriteId }: DislikeProductDto): Promise<Favorite> {
    return this.prisma.favorites.delete({
      where: { id: favoriteId },
    });
  }
}

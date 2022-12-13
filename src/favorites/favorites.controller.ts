import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DislikeProductDto } from './dto/dislike.product.dto';
import { FavoriteProductDto } from './dto/favorite.product.dto';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '@nestjs/passport';
import { Favorite } from './entities/favorite.entity';
import { AuthorizedUser } from 'src/auth/decorators/authorizedUser.decorator';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({
    summary: 'Favorita um produto',
  })
  @UseGuards(AuthorizedUser)
  async favoriteProduct(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    try {
      return await this.favoritesService.favoriteProduct(dto);
    } catch (error) {
      throw new UnauthorizedException(
        'O usuário não tem permissão para favoritar um produto deste perfil, verifique profile.id',
      );
    }
  }

  @Get('/profiles/:id')
  @ApiOperation({
    summary: 'Retorna todos os favoritos de perfis por ID',
    description: 'Inserir "profileId" para mostrar favoritos',
  })
  @UseGuards(AuthorizedUser)
  async getProfileFavorites(@Param('id') id: string): Promise<Favorite[]> {
    try {
      return await this.favoritesService.getProfileFavorites(id);
    } catch (error) {
      throw new UnauthorizedException(
        'O usuário não tem permissão para obter favoritos deste perfil, verifique profile.id',
      );
    }
  }

  @Delete()
  @ApiOperation({
    summary: 'Dislike a game',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthorizedUser)
  async dislikeProduct(@Body() dto: DislikeProductDto): Promise<Favorite> {
    try {
      return this.favoritesService.dislikeProduct(dto);
    } catch (error) {
      throw new UnauthorizedException(
        'User is not allowed to delete favorites of this profile. Please verify profile.id',
      );
    }
  }
}

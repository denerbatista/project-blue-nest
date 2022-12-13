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
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@nestjs/passport';
import { IsAdmin } from 'src/auth/decorators/isAdmin.decorator';

@ApiTags('Profiles')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo perfil de usuário',
  })
  async create(@Body() dto: CreateProfileDto) {
    try {
      return await this.profilesService.create(dto);
    } catch (error) {
      throw new BadRequestException('Erro ao criar perfil');
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os perfis',
  })
  @UseGuards(IsAdmin)
  async findAll() {
    try {
      return await this.profilesService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao lista perfis');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista um perfil por ID',
  })
  @UseGuards(IsAdmin)
  async findOne(@Param('id') id: string) {
    try {
      return await this.profilesService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar perfil');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza dados do perfil',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    try {
      return await this.profilesService.update(id, dto);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar perfil');
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleta um Profile por ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.profilesService.remove(id);
    } catch (error) {
      throw new BadRequestException('Erro ao deletar perfil');
    }
  }
}

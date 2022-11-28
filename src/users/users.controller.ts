import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUser } from './entities/user.entity';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      res.status(201).send(await this.usersService.create(createUserDto));
    } catch (error) {
      res.status(404).send({ message: 'Erro ao criar usuário' });
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna todos os usuários cadastrados',
  })
  async findAll(@Res() res: Response): Promise<void> {
    try {
      res.send(await this.usersService.findAll());
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna um usuário por ID',
  })
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const user: IUser[] | [] = await this.usersService.verifyIdAndReturnUser(
        id,
      );

      user.length > 0
        ? res.send(user)
        : res.status(404).send({ message: 'Usuário não encontrado' });
    } catch (error) {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza dados de um usuário por ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      res.send(await this.usersService.update(id, updateUserDto));
    } catch (error) {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete um usuário por ID',
  })
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      await this.usersService.remove(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  }
}

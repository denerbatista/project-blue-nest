import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private userSelect = {
    id: true,
    email: true,
    name: true,
    cpf: true,
    isAdmin: true,
  };

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);

    const newUser: IUser = await this.prisma.users.create({
      data: { ...createUserDto, isAdmin: false },
      select: this.userSelect,
    });

    return newUser;
  }

  async verifyIdAndReturnUser(id: string): Promise<IUser[] | []> {
    const user: IUser = await this.prisma.users.findUnique({
      where: { id },
      select: this.userSelect,
    });

    return !user ? [] : [user];
  }

  async findAll(): Promise<IUser[]> {
    const response: IUser[] = await this.prisma.users.findMany({
      select: { ...this.userSelect },
    });
    return response;
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    updateUserDto.password
      ? (updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8))
      : null;

    switch (updateUserDto.isAdmin !== undefined) {
      case true:
        switch (user.isAdmin) {
          case false:
            throw new UnauthorizedException(
              'Usuario não autorizado para alterar isAdmin',
            );
        }
    }

    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
      select: this.userSelect,
    });
  }

  async remove(id: string): Promise<IUser> {
    const userRemoved: IUser = await this.prisma.users.delete({
      where: { id },
      select: this.userSelect,
    });
    return userRemoved;
  }
}

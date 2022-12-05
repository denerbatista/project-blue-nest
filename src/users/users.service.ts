import { Injectable } from '@nestjs/common';
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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

    const data: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      cpf: createUserDto.cpf,
      isAdmin: createUserDto.isAdmin,
    };

    const newUser: IUser = await this.prisma.users.create({
      data,
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);

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

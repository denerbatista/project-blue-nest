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

  async create(createUserDto: CreateUserDto, id?: string) {
    const userCheckAdmin: {
      isAdmin: boolean;
    } = id
      ? await this.prisma.users.findUnique({
          where: { id },
          select: {
            isAdmin: true,
          },
        })
      : {
          isAdmin: false,
        };

    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

    const data: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      cpf: createUserDto.cpf,
      isAdmin: userCheckAdmin.isAdmin ? createUserDto.isAdmin : false,
    };

    const newUser = await this.prisma.users
      .create({ data, select: this.userSelect })
      .catch();

    return {
      data: { ...newUser },
      message: userCheckAdmin.isAdmin
        ? 'Usuário criado como Admin: ' + createUserDto.isAdmin
        : 'Você não tem autorização para criar usuário Admin',
    };
  }

  async verifyIdAndReturnUser(id: string): Promise<IUser[] | []> {
    const user: IUser = await this.prisma.users.findUnique({
      where: { id },
      select: {
        ...this.userSelect,
      },
    });

    return !user ? [] : [user];
  }

  async findAll(): Promise<IUser[]> {
    const response: IUser[] = await this.prisma.users.findMany({
      select: this.userSelect,
    });

    return response;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.users
      .update({
        where: { id },
        data: updateUserDto,
        select: this.userSelect,
      })
      .catch();
  }

  async remove(id: string): Promise<IUser> {
    const userRemoved: IUser = await this.prisma.users.delete({
      where: { id },
      select: this.userSelect,
    });
    return userRemoved;
  }
}

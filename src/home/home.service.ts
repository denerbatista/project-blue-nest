import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from 'src/users/entities/user.entity';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  async getHome({ email }: IUser) {
    const user = await this.prisma.users.findUnique({
      where: { email },
      include: {
        profiles: {
          include: {
            favorites: { include: { products: true } },
          },
        },
      },
    });

    delete user.password;

    return { user };
  }
}

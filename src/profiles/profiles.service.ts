import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const id: string = dto.userId;

    delete dto.userId;

    const data: Prisma.ProfilesCreateInput = {
      ...dto,
      user: {
        connect: {
          id,
        },
      },
    };

    return await this.prisma.profiles.create({ data });
  }

  async findAll() {
    return await this.prisma.profiles.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async verifyIdAndReturnProfile(id: string) {
    const profile = await this.prisma.profiles.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }

    return profile;
  }

  async findOne(id: string) {
    return await this.verifyIdAndReturnProfile(id);
  }

  async update(id: string, dto: UpdateProfileDto) {
    return await this.prisma.profiles.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.profiles.delete({
      where: { id },
      select: { title: true, id: true },
    });
  }
}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}

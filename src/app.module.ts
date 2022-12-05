import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Logger } from './utils/middleware.logDatabase';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    try {
      consumer.apply(Logger).forRoutes('*');
    } catch (error) {
      console.log(error);
      throw new Error('Method not implemented.');
    }
  }
}

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Server } from 'http';
import { AppModule } from './app.module';
import Loop from './utils/loop';

export const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Project-blue-nest')
    .setVersion('1.0.0')
    .addTag('Status')
    .addTag('Users')
    .addServer('https://project-blue-nest.onrender.com')
    .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const server: Server = await app.listen(port, () => {
    console.log(
      `Application running on ${
        !process.env.PORT ? 'http://localhost:' + port : 'port ' + port
      }`,
    );
  });

  process.on('SIGINT', () => {
    server.close();
    console.log('Finished Application');
  });
}

bootstrap();
Loop.start();

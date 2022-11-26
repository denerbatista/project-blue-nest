import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Server } from 'http';
import { AppModule } from './app.module';

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
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;

  const server: Server = await app.listen(port, () => {
    console.log(
      `Application running on ${
        port === 3000 ? `http://localhost:${port}` : `port ${port}`
      }`,
    );
  });

  process.on('SIGINT', () => {
    server.close();
    console.log('Finished Application');
  });
}

bootstrap();

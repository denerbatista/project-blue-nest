import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

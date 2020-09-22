import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://real-estate-ahmed.netlify.app/',
      credentials: true,
    },
  });
  await app.listen(process.env.PORT || port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();

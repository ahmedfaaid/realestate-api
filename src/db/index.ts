  import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import { SeederService } from './Seeders.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seedersService = app.get(SeederService);
  await seedersService.seedAll();
  app.close();

}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
  });

  await app.listen(config.getOrThrow<string>('APPLICATION_PORT'));
}
await bootstrap();

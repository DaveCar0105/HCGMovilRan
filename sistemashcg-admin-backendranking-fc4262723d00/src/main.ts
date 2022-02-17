import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { prototype } from 'module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(`Server is listening on ${process.env.NODE_ENV} in port ${port}`, 'Main');
}
bootstrap();

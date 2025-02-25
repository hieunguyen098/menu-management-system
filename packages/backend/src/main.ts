import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 9900);
}
bootstrap();

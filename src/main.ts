import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000 || process.env.PORT
  console.log(`Starting at ${PORT}`)
  await app.listen(PORT);
}
bootstrap();

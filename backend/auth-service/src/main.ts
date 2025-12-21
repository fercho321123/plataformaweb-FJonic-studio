import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de CORS robusta
  app.enableCors({
    origin: 'http://localhost:3000', // Tu URL de Frontend (Next.js)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // ✅ IMPORTANTE: Incluir PATCH y DELETE
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // 2. Activar validaciones globales (para que funcionen tus DTOs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 3. Puerto del Backend
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
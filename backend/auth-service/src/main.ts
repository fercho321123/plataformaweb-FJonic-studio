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
// En src/main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true, // Elimina lo que no esté en el DTO
  forbidNonWhitelisted: true, // Lanza error si hay datos extra
  transform: true, // Transforma tipos automáticamente
}));

  // 3. Puerto del Backend
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
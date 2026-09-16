import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: 'https://fjonic-admin.vercel.app',
    credentials: true,
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
    ],
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: false,
    }),
  );

  // Configuración para Vercel
  if (process.env.NODE_ENV === 'production') {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }

  // Desarrollo local
  const port = process.env.PORT || 3001;

  await app.listen(port);

  console.log(
    `🍔 FJonic Backend ACTIVADO en http://localhost:${port}`,
  );
}

// Manejador Serverless para Vercel
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return cachedServer(req, res);
};
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS
  app.enableCors({
    origin: [
      'https://fjonic-admin.vercel.app',
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ],
    credentials: true,
  });

  // 2. VALIDACIÓN GLOBAL (Ajustada para UUIDs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // Se cambia a false para evitar que intente transformar el UUID en un número
    transform: false, 
  }));

  // 3. LÓGICA DE ARRANQUE
  if (process.env.NODE_ENV === 'production') {
    await app.init();
    // Importante para Vercel: retornamos la instancia de express
    return app.getHttpAdapter().getInstance(); 
  } else {
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`\n🍔 FJonic Backend ACTIVADO en http://localhost:${port}`);
  }
}

// 🚀 Manejador para Vercel (Serverless)
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
};
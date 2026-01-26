import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS optimizado
  app.enableCors({
    origin: [
      'https://fjonic-admin.vercel.app',
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ],
    credentials: true,
  });

  // 2. VALIDACIÓN GLOBAL BLINDADA PARA UUIDs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // Se cambia a false: esto evita que rechace la petición si el ID no parece un número
    forbidNonWhitelisted: false, 
    // Se deja en false: evita que NestJS intente "adivinar" el tipo de dato
    transform: false, 
  }));

  // 3. LÓGICA DE ARRANQUE PARA VERCEL
  if (process.env.NODE_ENV === 'production') {
    await app.init();
    return app.getHttpAdapter().getInstance(); 
  } else {
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`\n🍔 FJonic Backend ACTIVADO en http://localhost:${port}`);
  }
}

// 🚀 Manejador Serverless (Vercel)
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
};
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS: Simplificado para asegurar conexión local
  app.enableCors({
    origin: true, // En local, esto es lo más seguro para evitar el "Failed to fetch"
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept, X-Requested-With',
  });

  // 2. VALIDACIÓN GLOBAL
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 3. ARRANCAR
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3001;
    // IMPORTANTE: Asegúrate de que no haya nada más corriendo en el 3001
    await app.listen(port);
    console.log(`\n🍔 FJonic Backend ACTIVADO`);
    console.log(`🚀 Corriendo en: http://localhost:${port}`);
  } else {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

// Export para Vercel
let cachedServer: any;
export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
};

// Solo para ejecución local
if (require.main === module || process.env.NODE_ENV !== 'production') {
  bootstrap();
}
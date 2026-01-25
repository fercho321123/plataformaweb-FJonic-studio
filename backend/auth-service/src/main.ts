import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS: Dinámico para Local y Producción
  app.enableCors({
    origin: [
      'https://fjonic-admin.vercel.app', // Tu URL de producción
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ],
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

  // 3. LÓGICA DE ARRANQUE
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`\n🍔 FJonic Backend ACTIVADO en http://localhost:${port}`);
  } else {
    // IMPORTANTE: En Vercel solo inicializamos, no escuchamos puerto
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

// 🚀 Lógica específica para exportar a Vercel
let cachedServer: any;

const handler = async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  // En producción (Vercel), cachedServer ya es la instancia de Express/Fastify
  return cachedServer(req, res);
};

export default handler;

// Solo ejecutamos bootstrap directamente si estamos en local
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
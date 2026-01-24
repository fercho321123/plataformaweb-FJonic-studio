import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS Blindada
  app.enableCors({
    origin: [
      'https://fjonic-admin.vercel.app', 
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  // Si estamos en Vercel, preparamos la app pero no hacemos listen
  if (process.env.VERCEL) {
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp;
  }

  // En local
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Servidor FJONIC corriendo en puerto: ${port}`);
}

// MANEJO DE VERCEL
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
};

// Solo ejecutar si no es Vercel
if (!process.env.VERCEL) {
  bootstrap();
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      /\.vercel\.app$/,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  // Si estamos en Vercel, inicializamos y devolvemos la instancia de Express
  if (process.env.VERCEL) {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }

  // Si es local, escuchamos en el puerto
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Servidor FJONIC corriendo en puerto: ${port}`);
}

// LÓGICA DE EXPORTACIÓN PARA VERCEL (Corregida)
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  // Llamamos a la instancia de Express con los objetos req y res de Node
  return cachedServer(req, res);
};

// Solo ejecutar bootstrap() directamente si NO estamos en Vercel
if (!process.env.VERCEL) {
  bootstrap();
}
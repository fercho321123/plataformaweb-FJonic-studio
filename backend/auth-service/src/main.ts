import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ TU CONFIGURACIÓN DE CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',      // Local Público
      'http://localhost:3002',      // Local Privado
      /\.vercel\.app$/,             // Subdominios de Vercel
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  // IMPORTANTE: En Vercel usamos .init(), en local usamos .listen()
  if (process.env.VERCEL) {
    await app.init();
    return app.getHttpAdapter().getInstance();
  } else {
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Servidor FJONIC corriendo en puerto: ${port}`);
  }
}

// Lógica de exportación para Vercel
let server: any;
export default async (req: any, res: any) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
};

if (!process.env.VERCEL) {
  bootstrap();
}
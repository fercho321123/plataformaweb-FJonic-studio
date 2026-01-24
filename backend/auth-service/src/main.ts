import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ CORS ACTUALIZADO PARA PRODUCCIÓN Y LOCAL
  app.enableCors({
    origin: [
      'http://localhost:3000',      // Local Público
      'http://localhost:3002',      // Local Privado
      /\.vercel\.app$/,             // 👈 Esto permite CUALQUIER subdominio de Vercel (muy útil)
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // 🌍 IMPORTANTE: Vercel asigna el puerto automáticamente mediante process.env.PORT
  const port = process.env.PORT || 3001;
  
  await app.listen(port);
  console.log(`🚀 Servidor FJONIC corriendo en puerto: ${port}`);
}
bootstrap();
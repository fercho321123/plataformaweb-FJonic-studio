import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ CORS CORREGIDO: Permite la entrada desde tus dos frontends
  app.enableCors({
    origin: [
      'http://localhost:3000', // Frontend Público
      'http://localhost:3002'  // Frontend Privado (Cambiamos el 3001 por el 3002)
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // El backend se queda en el 3001
  await app.listen(3001);
  console.log(`🚀 Servidor FJONIC escuchando en puerto 3001`);
}
bootstrap();
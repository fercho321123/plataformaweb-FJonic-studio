import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ ACTUALIZA ESTO: Habilita CORS correctamente
  app.enableCors({
    origin: 'http://localhost:3000', // URL exacta de tu Frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3001);
  console.log(`🚀 Servidor FJONIC escuchando en puerto 3001`);
}
bootstrap();
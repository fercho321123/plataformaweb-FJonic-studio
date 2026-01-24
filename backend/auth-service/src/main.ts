import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Creamos la instancia de la aplicación
  const app = await NestFactory.create(AppModule);

  // 1. CONFIGURACIÓN DE CORS NATIVA (Más robusta para Vercel)
  app.enableCors({
    origin: 'https://fjonic-admin.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept, X-Requested-With',
  });

  // 2. INTERCEPTOR MANUAL (Doble capa de seguridad para peticiones OPTIONS)
  const expressApp = app.getHttpAdapter().getInstance();
  // Dentro de bootstrap(), reemplaza el bloque de expressApp.use:
expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://fjonic-admin.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Respuesta inmediata para el preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

  // 3. VALIDACIÓN GLOBAL
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // IMPORTANTE: Inicializar para Vercel sin levantar el servidor con .listen()
  await app.init();
  return expressApp;
}

// Lógica de cache para evitar reconexiones innecesarias en cada petición
let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    try {
      cachedServer = await bootstrap();
    } catch (err) {
      console.error('Error inicializando NestJS:', err);
      return res.status(500).send('Error interno del servidor');
    }
  }
  return cachedServer(req, res);
};
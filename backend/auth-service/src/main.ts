import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. INTERCEPTOR MANUAL DE CORS (Solución definitiva para Vercel)
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fjonic-admin.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Si es una petición de "preflight" (OPTIONS), respondemos 200 inmediatamente
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.VERCEL) {
    await app.init();
    return expressApp;
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
}

let cachedServer: any;
export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
};

if (!process.env.VERCEL) {
  bootstrap();
}
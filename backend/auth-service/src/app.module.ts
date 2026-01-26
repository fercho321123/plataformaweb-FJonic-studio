import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ClientesModule } from './clientes/clientes.module';
import { FacturacionModule } from './facturacion/facturacion.module'; 
import { SoporteModule } from './soporte/soporte.module'; 

@Module({
  imports: [
    // 1. Configuración de variables de entorno
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),

    // 2. Conexión a Base de Datos (Postgres)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // Soporta DATABASE_URL de Supabase/Render o POSTGRES_URL de Vercel
        url: configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ Cuidado: Intenta actualizar tablas automáticamente
        ssl: {
          rejectUnauthorized: false,
        },
        // Optimización para conexiones Serverless (Vercel)
        extra: {
          max: 10,
          connectionTimeoutMillis: 30000,
        },
      }),
    }),

    // 3. Módulos de la Aplicación
    AuthModule,
    UsuariosModule,
    ProyectosModule,
    ClientesModule,
    FacturacionModule,
    SoporteModule,
  ],
})
export class AppModule {}
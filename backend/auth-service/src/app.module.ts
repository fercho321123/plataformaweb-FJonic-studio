import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { SoporteModule } from './soporte/soporte.module';

@Module({
  imports: [
    // Carga las variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // Si existe POSTGRES_URL (Vercel/Neon), la usa. Si no, usa localhost.
        url: configService.get('POSTGRES_URL') || configService.get('DATABASE_URL'),
        host: configService.get('POSTGRES_URL') ? undefined : 'localhost',
        port: 5432,
        username: configService.get('POSTGRES_URL') ? undefined : 'postgres',
        password: configService.get('POSTGRES_URL') ? undefined : 'Yao072212',
        database: configService.get('POSTGRES_URL') ? undefined : 'fjonic_autenticacion',
        autoLoadEntities: true,
        synchronize: false, // Mejor mantenerlo en false para evitar pérdida de datos en Neon
        ssl: configService.get('POSTGRES_URL') ? { rejectUnauthorized: false } : false,
      }),
    }),

    UsuariosModule,
    AuthModule,
    ClientesModule,
    ProyectosModule,
    FacturacionModule,
    SoporteModule,
  ],
})
export class AppModule {}
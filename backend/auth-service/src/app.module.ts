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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Priorizamos la URL de Neon que configuraste en Vercel
        const dbUrl = configService.get('POSTGRES_URL') || configService.get('DATABASE_URL');
        
        return {
          type: 'postgres',
          url: dbUrl,
      
          host: dbUrl ? undefined : 'localhost',
          port: 5432,
          username: dbUrl ? undefined : 'postgres',
          password: dbUrl ? undefined : 'Yao072212',
          database: dbUrl ? undefined : 'fjonic_autenticacion',
          autoLoadEntities: true,
          synchronize: false, 
          // CRÍTICO: Neon requiere SSL obligatorio en la nube
          ssl: dbUrl ? { rejectUnauthorized: false } : false,
        };
      },
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
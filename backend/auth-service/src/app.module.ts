import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ClientesModule } from './clientes/clientes.module';
// 👇 IMPORTA LOS MÓDULOS QUE FALTAN
import { FacturacionModule } from './facturacion/facturacion.module'; 
import { SoporteModule } from './soporte/soporte.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL'),
        autoLoadEntities: true,
        synchronize: true, // Esto creará las tablas de Facturación y Soporte en Neon automáticamente
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    UsuariosModule,
    ProyectosModule,
    ClientesModule,
    // 👇 REGÍSTRALOS AQUÍ TAMBIÉN
    FacturacionModule,
    SoporteModule,
  ],
})
export class AppModule {}
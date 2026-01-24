import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // Vercel inyecta estas automáticamente
        url: configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL'),
        autoLoadEntities: true,
        synchronize: false, 
        ssl: {
          rejectUnauthorized: false, // Obligatorio para Neon
        },
      }),
    }),
    AuthModule,
    UsuariosModule,
    ProyectosModule,
    ClientesModule,
  ],
})
export class AppModule {}
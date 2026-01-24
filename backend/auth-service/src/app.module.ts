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
      useFactory: (configService: ConfigService) => {
        // Vercel usa DATABASE_URL o POSTGRES_URL automáticamente
        const dbUrl = configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL');

        return {
          type: 'postgres',
          url: dbUrl, // Usamos la URL completa que ya está en tu Vercel
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'production',
          ssl: {
            rejectUnauthorized: false, // Requerido por Neon
          },
        };
      },
    }),
    AuthModule,
    UsuariosModule,
    ProyectosModule,
    ClientesModule,
  ],
})
export class AppModule {}
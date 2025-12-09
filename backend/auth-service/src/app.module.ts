import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProyectosModule } from './proyectos/proyectos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

      TypeOrmModule.forRoot({
        
        type: 'postgres',
        host: 'localhost',
        port:5432,
        username: 'postgres',
        password: 'Yao072212',
        database: 'fjonic_autenticacion',
        autoLoadEntities: true,
        synchronize: true, // solo para desarrollo
      }),

    UsuariosModule,

    AuthModule,

    ClientesModule,

    ProyectosModule,
  ],
})
export class AppModule {}

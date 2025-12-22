import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoporteService } from './soporte.service';
import { SoporteController } from './soporte.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Notificacion } from '../notificaciones/entities/notificacion.entity'; // 👈 Importa la entidad
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [
    // 🔔 AQUÍ ESTÁ LA CLAVE: Debes registrar ambas entidades para este módulo
    TypeOrmModule.forFeature([Usuario, Notificacion]), 
    NotificacionesModule,
  ],
  controllers: [SoporteController],
  providers: [SoporteService],
})
export class SoporteModule {}
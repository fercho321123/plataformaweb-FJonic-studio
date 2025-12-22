import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity'; // 👈 Importa la entidad Proyecto
import { Notificacion } from '../notificaciones/entities/notificacion.entity'; // 👈 Importa la entidad Notificacion

@Module({
  imports: [
    // 🟢 CLAVE: Agregamos Proyecto y Notificacion aquí para que el Repositorio esté disponible
    TypeOrmModule.forFeature([Cliente, Proyecto, Notificacion]), 
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService], // Por si otros módulos necesitan usar ClientesService
})
export class ClientesModule {}


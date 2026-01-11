import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './entities/proyecto.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Hito } from './entities/hito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyecto, Cliente, Hito]),// ⬅️ AQUÍ
  ],
  providers: [ProyectosService],
  controllers: [ProyectosController],
})
export class ProyectosModule {}


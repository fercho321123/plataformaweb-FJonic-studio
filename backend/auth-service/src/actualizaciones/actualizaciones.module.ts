import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActualizacionesService } from './actualizaciones.service';
import { ActualizacionesController } from './actualizaciones.controller';
import { ActualizacionProyecto } from './entities/actualizacion.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActualizacionProyecto,
      Proyecto,
      Usuario,
    ]),
  ],
  controllers: [ActualizacionesController],
  providers: [ActualizacionesService],
})
export class ActualizacionesModule {}

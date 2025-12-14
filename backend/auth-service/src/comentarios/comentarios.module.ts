import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';

import { ComentarioProyecto } from './entities/comentario.entity';
import { ActualizacionProyecto } from '../actualizaciones/entities/actualizacion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComentarioProyecto,
      ActualizacionProyecto,
      Usuario, // 🔥 ESTE ERA EL QUE FALTABA
    ]),
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}

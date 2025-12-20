import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ComentarioProyecto } from './entities/comentario.entity';
import { ActualizacionProyecto } from '../actualizaciones/entities/actualizacion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(ComentarioProyecto)
    private readonly comentarioRepo: Repository<ComentarioProyecto>,

    @InjectRepository(ActualizacionProyecto)
    private readonly actualizacionRepo: Repository<ActualizacionProyecto>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // 👉 Crear comentario
  async crear(
    actualizacionId: string,
    contenido: string,
    usuarioId: string,
  ) {
    const actualizacion = await this.actualizacionRepo.findOneBy({
      id: actualizacionId,
    });

    if (!actualizacion) {
      throw new NotFoundException('Actualización no encontrada');
    }

    const usuario = await this.usuarioRepo.findOneBy({
      id: usuarioId,
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const comentario = new ComentarioProyecto();
    comentario.contenido = contenido;
    comentario.actualizacion = actualizacion;
    comentario.usuario = usuario;

    return this.comentarioRepo.save(comentario);
  }

  // 👉 Listar comentarios por actualización
  async obtenerPorActualizacion(actualizacionId: string) {
    return this.comentarioRepo.find({
      where: {
        actualizacion: { id: actualizacionId },
      },
      order: {
        creadoEn: 'ASC',
      },
      relations: ['usuario'],
    });
  }
}

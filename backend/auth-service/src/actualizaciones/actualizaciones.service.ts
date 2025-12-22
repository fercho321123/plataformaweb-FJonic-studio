import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizacionProyecto } from './entities/actualizacion.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ActualizacionesService {
  constructor(
    @InjectRepository(ActualizacionProyecto)
    private readonly actualizacionRepo: Repository<ActualizacionProyecto>,

    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // ✅ Crear actualización
  async crear(
    proyectoId: number,
    titulo: string,
    descripcion: string,
    usuarioId: string,
  ) {
    if (!proyectoId || isNaN(proyectoId)) {
      throw new BadRequestException('proyectoId inválido');
    }

    const proyecto = await this.proyectoRepo.findOne({
      where: { id: proyectoId },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const actualizacion = this.actualizacionRepo.create({
      titulo,
      descripcion,
      proyecto,
      creadoPor: usuario,
    });

    return await this.actualizacionRepo.save(actualizacion);
  }

  // ✅ Listar actualizaciones por proyecto (Con hilos de comentarios)
  async listarPorProyecto(proyectoId: number) {
    if (!proyectoId || isNaN(proyectoId)) {
      throw new BadRequestException('proyectoId inválido');
    }

    return await this.actualizacionRepo.find({
      where: {
        proyecto: { id: proyectoId },
      },
      relations: ['creadoPor', 'comentarios', 'comentarios.usuario'], // Trae toda la conversación
      order: {
        creadoEn: 'DESC', // Lo más reciente primero
      },
    });
  }
}
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  // ✅ Crear actualización (admin / staff)
  async crear(
    proyectoId: number,
    titulo: string,
    contenido: string,
    usuarioId: string,
  ) {
    if (!proyectoId) {
      throw new BadRequestException('proyectoId es obligatorio');
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
  descripcion: contenido, // 🔥 MAPEO CORRECTO
  proyecto,
  creadoPor: usuario,
});


    return this.actualizacionRepo.save(actualizacion);
  }

  // ✅ Obtener actualizaciones por proyecto
  async listarPorProyecto(proyectoId: number) {
    return this.actualizacionRepo.find({
      where: {
        proyecto: { id: proyectoId },
      },
      relations: ['creadoPor'],
      order: {
        creadoEn: 'DESC',
      },
    });
  }
}

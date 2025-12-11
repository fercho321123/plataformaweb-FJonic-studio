import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  // ✅ CREAR PROYECTO
  async crear(data: any): Promise<Proyecto> {
    const cliente = await this.clienteRepo.findOne({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const proyecto = new Proyecto();

    proyecto.nombre = data.nombre;
    proyecto.descripcion = data.descripcion;

    // ✅ ESTADO CONTROLADO
    proyecto.estado = ['pendiente', 'iniciado', 'finalizado'].includes(data.estado)
      ? data.estado
      : 'pendiente';

    // ✅ FECHA INICIO
    proyecto.fechaInicio =
      data.fechaInicio && data.fechaInicio !== ''
        ? new Date(data.fechaInicio)
        : new Date();

    // ✅ FECHA FIN (COMO TÚ LO PEDISTE)
    proyecto.fechaFin = data.fechaFin as any;

    proyecto.cliente = cliente;

    return await this.proyectoRepo.save(proyecto);
  }

  // ✅ LISTAR PROYECTOS
  async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepo.find({
      relations: ['cliente'],
    });
  }

  // ✅ ELIMINAR PROYECTO (ID = NUMBER)
  async eliminar(id: number) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return await this.proyectoRepo.remove(proyecto);
  }

  // ✅ ACTUALIZAR PROYECTO (ID = NUMBER)
  async actualizar(id: number, data: any): Promise<Proyecto> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (data.nombre !== undefined) proyecto.nombre = data.nombre;
    if (data.descripcion !== undefined) proyecto.descripcion = data.descripcion;

    // ✅ ESTADO CONTROLADO
    if (['pendiente', 'iniciado', 'finalizado'].includes(data.estado)) {
      proyecto.estado = data.estado;
    }

    // ✅ FECHA INICIO
    if (data.fechaInicio && data.fechaInicio !== '') {
      proyecto.fechaInicio = new Date(data.fechaInicio);
    }

    // ✅ FECHA FIN (FORZADA COMO PEDISTE)
    proyecto.fechaFin = data.fechaFin as any;

    return await this.proyectoRepo.save(proyecto);
  }
}




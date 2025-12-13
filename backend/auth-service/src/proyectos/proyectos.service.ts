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

  // 👉 Crear proyecto (admin / staff)
  async crear(data: any): Promise<Proyecto> {
    const cliente = await this.clienteRepo.findOne({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const proyecto = this.proyectoRepo.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      estado: ['pendiente', 'iniciado', 'finalizado'].includes(data.estado)
        ? data.estado
        : 'pendiente',
      fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : new Date(),
      fechaFin: data.fechaFin || null,
      cliente,
    });

    return this.proyectoRepo.save(proyecto);
  }

  // 👉 Admin / Staff: todos los proyectos
  async findAll() {
    return this.proyectoRepo.find({
      relations: ['cliente'],
    });
  }

// ✅ Buscar proyectos por email del cliente
async buscarPorEmail(email: string) {
  return this.proyectoRepo.find({
    where: {
      cliente: {
        email: email,
      },
    },
    relations: ['cliente'],
    order: {
      fechaInicio: 'DESC',
    },
  });
}





  // 👉 Eliminar proyecto (admin)
  async eliminar(id: number) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return this.proyectoRepo.remove(proyecto);
  }

  // 👉 Actualizar proyecto (admin / staff)
  async actualizar(id: number, data: any): Promise<Proyecto> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (data.nombre) proyecto.nombre = data.nombre;
    if (data.descripcion) proyecto.descripcion = data.descripcion;

    if (['pendiente', 'iniciado', 'finalizado'].includes(data.estado)) {
      proyecto.estado = data.estado;
    }

    if (data.fechaInicio) {
      proyecto.fechaInicio = new Date(data.fechaInicio);
    }

    proyecto.fechaFin = data.fechaFin || null;

    return this.proyectoRepo.save(proyecto);
  }
}

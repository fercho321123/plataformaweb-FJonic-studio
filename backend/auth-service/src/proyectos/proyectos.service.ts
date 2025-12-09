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

  async crear(data: any): Promise<Proyecto> {
    const cliente = await this.clienteRepo.findOne({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const proyecto = new Proyecto();
    
    // Usamos (as any) en cada asignación para silenciar el error de TypeScript
proyecto.nombre = data.nombre;
proyecto.descripcion = data.descripcion ?? null;

// ESTADO CONTROLADO
proyecto.estado = ['pendiente', 'iniciado', 'finalizado'].includes(data.estado)
  ? data.estado
  : 'pendiente';

// FECHA INICIO OBLIGATORIA
proyecto.fechaInicio = data.fechaInicio ? new Date(data.fechaInicio) : new Date();

// FECHA FIN OPCIONAL
 proyecto.fechaFin = data.fechaFin as any;

proyecto.cliente = cliente;

    return await this.proyectoRepo.save(proyecto);
  }

  async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepo.find({ relations: ['cliente'] });
  }
}
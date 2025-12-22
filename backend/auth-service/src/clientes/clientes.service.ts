import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Notificacion } from '../notificaciones/entities/notificacion.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,

    @InjectRepository(Notificacion)
    private readonly notificacionRepo: Repository<Notificacion>,
  ) {}

  // 1. Obtener todos los clientes
  async findAll() {
    return await this.clienteRepo.find({
      order: { nombre: 'ASC' }
    });
  }

  // 2. Crear un nuevo cliente
// En clientes.service.ts
async create(data: any) {
  try {
    const nuevoCliente = this.clienteRepo.create({
      ...data,
      activo: true // Forzamos el estado inicial
    });
    return await this.clienteRepo.save(nuevoCliente);
  } catch (error) {
    console.error("Error al guardar en BD:", error);
    throw error; // Esto enviará el detalle al log de NestJS
  }
}
  // 3. Obtener un cliente por ID
  async findOne(id: string) {
    const cliente = await this.clienteRepo.findOne({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  // 4. Actualizar cliente
  async update(id: string, data: any) {
    const cliente = await this.findOne(id);
    const clienteActualizado = this.clienteRepo.merge(cliente, data);
    return await this.clienteRepo.save(clienteActualizado);
  }

async eliminar(id: string) {
  // 1. Verificamos que el cliente exista
  const cliente = await this.clienteRepo.findOne({ where: { id } });
  if (!cliente) throw new NotFoundException('Cliente no encontrado');

  try {
    // 2. Limpieza manual de Notificaciones (porque no suelen tener FK real)
    // Usamos el ID del cliente que es el que se guarda en las notificaciones
    await this.notificacionRepo.delete({ usuarioId: id });

    // 3. Borrar al cliente
    // Como Proyecto tiene CASCADE y Hito ahora también, 
    // la base de datos borrará todo en cadena automáticamente.
    await this.clienteRepo.delete(id);

    return { message: 'Cliente y todos sus datos relacionados eliminados con éxito' };
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw new ConflictException('No se pudo eliminar el cliente. Verifique que no existan otras tablas vinculadas.');
  }
}
}
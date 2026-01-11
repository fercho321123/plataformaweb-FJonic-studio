import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  // 1. Obtener todos los clientes (Ordenados por fecha de registro para ver los más nuevos primero)
  async findAll() {
    return await this.clienteRepo.find({
      order: { fechaRegistro: 'DESC' }
    });
  }

  // 2. Crear un nuevo cliente (Adaptado para Agencia de Marketing)
  async create(data: any) {
    try {
      // Validamos si el email ya existe para evitar errores de duplicado
      const existe = await this.clienteRepo.findOne({ where: { email: data.email } });
      if (existe) {
        throw new ConflictException('Este correo electrónico ya está registrado.');
      }

      const nuevoCliente = this.clienteRepo.create({
        ...data,
        presupuesto: Number(data.presupuesto) || 0, // Aseguramos que sea número
        activo: true 
      });

      return await this.clienteRepo.save(nuevoCliente);
    } catch (error) {
      console.error("Error al guardar en BD:", error);
      throw error; 
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
    
    // Si viene presupuesto en el update, lo convertimos a número
    if (data.presupuesto) {
      data.presupuesto = Number(data.presupuesto);
    }

    const clienteActualizado = this.clienteRepo.merge(cliente, data);
    return await this.clienteRepo.save(clienteActualizado);
  }

  // 5. Eliminar cliente y limpiar datos relacionados
  async eliminar(id: string) {
    // 1. Verificamos que el cliente exista
    const cliente = await this.clienteRepo.findOne({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    try {
      // 2. Limpieza de Notificaciones vinculadas al ID del client

      // 3. Borrar al cliente
      // Nota: Si configuraste ON DELETE CASCADE en la entidad Proyecto, 
      // al borrar el cliente se borrarán sus proyectos automáticamente.
      await this.clienteRepo.delete(id);

      return { message: 'Cuenta de cliente y estrategias eliminadas con éxito' };
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw new ConflictException('Error de integridad: No se pudo eliminar el cliente. Verifique vinculaciones externas.');
    }
  }
}
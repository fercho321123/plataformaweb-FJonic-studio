import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  // Crear cliente
  async create(data: CreateClienteDto) {
    const cliente = this.clienteRepo.create(data);
    return this.clienteRepo.save(cliente);
  }

  // Listar todos
  async findAll() {
    return this.clienteRepo.find({
      order: { creadoEn: 'DESC' }, 
    });
  }

// src/clientes/clientes.service.ts

async update(id: string, data: any) {
  const cliente = await this.clienteRepo.findOne({ 
    where: { id: id as any } 
  });

  if (!cliente) {
    throw new NotFoundException(`Cliente no encontrado`);
  }

  Object.assign(cliente, data);
  return await this.clienteRepo.save(cliente);
}}
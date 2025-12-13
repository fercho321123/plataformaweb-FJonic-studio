import { Injectable } from '@nestjs/common';
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

  // ✅ CREAR CLIENTE (SIN usuarioId)
  async create(data: CreateClienteDto) {
    const cliente = this.clienteRepo.create(data);
    return this.clienteRepo.save(cliente);
  }

  async findAll() {
    return this.clienteRepo.find({
      order: { creadoEn: 'DESC' }, // ⚠️ usa el nombre REAL de la columna
    });
  }

  async remove(id: string) {
    return this.clienteRepo.delete(id);
  }
}

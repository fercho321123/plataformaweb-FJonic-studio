import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @Roles('admin', 'staff')
  findAll() {
    return this.clientesService.findAll();
  }

  @Post()
  @Roles('admin', 'staff')
  create(@Body() body: CreateClienteDto) {
    return this.clientesService.create(body);
  }

// src/clientes/clientes.controller.ts

@Patch(':id') // 👈 Asegúrate de que tiene los dos puntos :id
@Roles('admin', 'staff')
async update(
  @Param('id') id: string, 
  @Body() body: any
) {
  // Si tus IDs son UUID (como el del error), no uses ParseIntPipe
  return this.clientesService.update(id, body);
}}
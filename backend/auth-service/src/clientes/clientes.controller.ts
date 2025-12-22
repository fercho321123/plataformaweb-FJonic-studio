import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
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

  @Patch(':id')
  @Roles('admin', 'staff')
  async update(
    @Param('id') id: string, // Eliminado ParseIntPipe porque usas UUID
    @Body() body: any
  ) {
    return this.clientesService.update(id, body);
  }

  @Delete(':id') // 👈 Agregado el método que faltaba
  @Roles('admin', 'staff')
  async eliminar(@Param('id') id: string) {
    // IMPORTANTE: id es string para que coincida con el UUID de la base de datos
    return this.clientesService.eliminar(id);
  }
}
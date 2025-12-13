import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
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

  // ✅ VER CLIENTES (ADMIN, STAFF)
  @Get()
  @Roles('admin', 'staff')
  findAll() {
    return this.clientesService.findAll();
  }

  // ✅ CREAR CLIENTE (ADMIN, STAFF)
@Post()
@Roles('admin', 'staff')
create(@Body() body: CreateClienteDto) {
  return this.clientesService.create(body);
}


  // ✅ ELIMINAR CLIENTE (SOLO ADMIN)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('proyectos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // ✅ ADMIN y STAFF crean
  @Post()
  @Roles('admin', 'staff')
  crear(@Body() body: any) {
    return this.proyectosService.crear(body);
  }

  // ✅ TODOS pueden ver
  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  // ✅ SOLO ADMIN puede eliminar
@Delete(':id')
@Roles('admin')
eliminar(@Param('id') id: string) {
  return this.proyectosService.eliminar(Number(id));
}

@Patch(':id')
@Roles('admin', 'staff')
actualizar(@Param('id') id: string, @Body() body: any) {
  return this.proyectosService.actualizar(Number(id), body);
}
}


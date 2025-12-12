import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('proyectos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // 👉 Crear proyecto (solo admin y staff)
  @Post()
  @Roles('admin', 'staff')
  crear(@Body() body: any) {
    return this.proyectosService.crear(body);
  }

  // 👉 CLIENTE obtiene solo sus proyectos
  @Get('mios')
  @Roles('cliente', 'admin', 'staff')
  getMisProyectos(@Req() req) {
    return this.proyectosService.findByClienteEmail(req.user.email);
  }

  // 👉 Admin y staff: ver todo
  @Get()
  @Roles('admin', 'staff')
  findAll() {
    return this.proyectosService.findAll();
  }

  // 👉 Eliminar proyecto
  @Delete(':id')
  @Roles('admin')
  eliminar(@Param('id') id: string) {
    return this.proyectosService.eliminar(Number(id));
  }

  // 👉 Actualizar proyecto
  @Patch(':id')
  @Roles('admin', 'staff')
  actualizar(@Param('id') id: string, @Body() body: any) {
    return this.proyectosService.actualizar(Number(id), body);
  }
}

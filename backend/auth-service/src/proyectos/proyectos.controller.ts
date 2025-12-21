import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('proyectos')
@UseGuards(JwtAuthGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  crear(@Body() data: any) {
    return this.proyectosService.crear(data);
  }

  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get('mis-proyectos')
  obtenerMisProyectos(@Req() req: Request) {
    const user = req.user as any;
    return this.proyectosService.buscarPorEmail(user.email);
  }

  @Get('buscar/:email')
  buscarPorEmail(@Param('email') email: string) {
    return this.proyectosService.buscarPorEmail(email);
  }

  @Patch('hitos/:id/completar')
  completarHito(@Param('id') id: string) {
    return this.proyectosService.completarHito(id);
  }

  @Get(':id/progreso')
  async obtenerProgreso(@Param('id', ParseIntPipe) id: number) {
    const progreso = await this.proyectosService.calcularProgresoProyecto(id);
    return { proyectoId: id, progreso };
  }

  @Get(':id')
  obtenerProyectoConProgreso(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.obtenerProyectoConProgreso(id);
  }

  // ✅ Corregido para evitar errores de tipo en el ID
  @Patch(':id')
  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    const numericId = parseInt(id, 10);
    return this.proyectosService.actualizar(numericId, data);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.eliminar(id);
  }
}
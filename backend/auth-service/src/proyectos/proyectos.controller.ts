import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';

@Controller('proyectos') // ✅ ESTA LÍNEA ES LA MÁS IMPORTANTE
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  crear(@Body() body: any) {
    return this.proyectosService.crear(body);
  }

  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }
}

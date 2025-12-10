import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // ✅ CREAR PROYECTO
  @Post()
  crear(@Body() body: any) {
    return this.proyectosService.crear(body);
  }

  // ✅ LISTAR PROYECTOS
  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  // ✅ ELIMINAR PROYECTO
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.proyectosService.eliminar(Number(id));
  }

  // ✅ ACTUALIZAR PROYECTO (ESTADO, FECHAS, NOMBRE, DESCRIPCIÓN)
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() body: any) {
    return this.proyectosService.actualizar(Number(id), body);
  }
}


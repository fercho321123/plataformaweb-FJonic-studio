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
  UnauthorizedException,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('proyectos')
//@UseGuards(JwtAuthGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // =====================================================
  // 👉 LISTA PRINCIPAL (ADMIN O CLIENTE)
  // =====================================================
  @Get()
  async findAll(@Req() req: any) {
    const usuario = req.user;

    // Si es admin, ve absolutamente todo con progreso
    if (usuario.rol === 'admin') {
      return await this.proyectosService.findAll();
    }

    // Normalizamos el email del token antes de buscar
    const emailNormalizado = usuario.email.toLowerCase().trim();

    // Si no es admin (es cliente), solo ve sus proyectos vinculados a su email
    return await this.proyectosService.buscarPorEmail(emailNormalizado);
  }

  // =====================================================
  // 👉 RUTA ESPECÍFICA PARA EL CLIENTE (POR SEGURIDAD)
  // =====================================================
  @Get('mis-proyectos')
  async obtenerMisProyectos(@Req() req: any) {
    // Normalizamos el email que viene del JWT
    const emailNormalizado = req.user.email.toLowerCase().trim();
    return await this.proyectosService.buscarPorEmail(emailNormalizado);
  }

  // =====================================================
  // 👉 RUTAS ADMINISTRATIVAS
  // =====================================================
  
  @Post()
  crear(@Body() data: any, @Req() req: any) {
    if (req.user.rol !== 'admin') throw new UnauthorizedException('Solo administradores');
    return this.proyectosService.crear(data);
  }

  @Get('buscar/:email')
  buscarPorEmail(@Param('email') email: string, @Req() req: any) {
    // Solo permitimos que el admin busque correos arbitrarios
    if (req.user.rol !== 'admin') throw new UnauthorizedException();
    
    const emailNormalizado = email.toLowerCase().trim();
    return this.proyectosService.buscarPorEmail(emailNormalizado);
  }

  // =====================================================
  // 👉 GESTIÓN DE HITOS Y PROGRESO
  // =====================================================

  @Patch('hitos/:id/completar')
  completarHito(@Param('id') id: string) {
    return this.proyectosService.completarHito(id);
  }

  @Patch('hitos/:id/toggle')
  toggleHito(@Param('id') id: string) {
    return this.proyectosService.toggleHito(id);
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

  // =====================================================
  // 👉 ACTUALIZACIÓN Y ELIMINACIÓN
  // =====================================================

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
    @Req() req: any
  ) {
    if (req.user.rol !== 'admin') throw new UnauthorizedException();
    return this.proyectosService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    if (req.user.rol !== 'admin') throw new UnauthorizedException();
    return this.proyectosService.eliminar(id);
  }
}
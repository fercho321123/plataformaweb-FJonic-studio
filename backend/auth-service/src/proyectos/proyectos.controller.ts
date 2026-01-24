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
// Recomendación: Mantén el Guard activo para que req.user se llene correctamente
@UseGuards(JwtAuthGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // =====================================================
  // 👉 LISTA PRINCIPAL (ADMIN O CLIENTE)
  // =====================================================
  @Get()
  async findAll(@Req() req: any) {
    const usuario = req.user;

    // Validación de seguridad para evitar el Error 500
    if (!usuario) {
      throw new UnauthorizedException('Token inválido o no proporcionado');
    }

    // Si es admin, ve absolutamente todo
    if (usuario.rol === 'admin') {
      return await this.proyectosService.findAll();
    }

    // Si es cliente, solo sus proyectos
    const emailNormalizado = usuario.email.toLowerCase().trim();
    return await this.proyectosService.buscarPorEmail(emailNormalizado);
  }

  // =====================================================
  // 👉 RUTA ESPECÍFICA PARA EL CLIENTE
  // =====================================================
  @Get('mis-proyectos')
  async obtenerMisProyectos(@Req() req: any) {
    if (!req.user) throw new UnauthorizedException();
    
    const emailNormalizado = req.user.email.toLowerCase().trim();
    return await this.proyectosService.buscarPorEmail(emailNormalizado);
  }

  // =====================================================
  // 👉 RUTAS ADMINISTRATIVAS (Protegidas por ROL)
  // =====================================================
  
  @Post()
  crear(@Body() data: any, @Req() req: any) {
    if (!req.user || req.user.rol !== 'admin') {
      throw new UnauthorizedException('Solo administradores pueden crear proyectos');
    }
    return this.proyectosService.crear(data);
  }

  @Get('buscar/:email')
  buscarPorEmail(@Param('email') email: string, @Req() req: any) {
    if (!req.user || req.user.rol !== 'admin') throw new UnauthorizedException();
    
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
    return await this.proyectosService.calcularProgresoProyecto(id);
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
    if (!req.user || req.user.rol !== 'admin') throw new UnauthorizedException();
    return this.proyectosService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    if (!req.user || req.user.rol !== 'admin') throw new UnauthorizedException();
    return this.proyectosService.eliminar(id);
  }
}
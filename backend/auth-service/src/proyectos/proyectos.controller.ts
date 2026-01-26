import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // Quitamos ParseIntPipe de aquí si no se usa en ningún lado
  Patch,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('proyectos')
@UseGuards(JwtAuthGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  async findAll(@Req() req: any) {
    const usuario = req.user;
    if (!usuario) {
      throw new UnauthorizedException('Token inválido o no proporcionado');
    }

    if (usuario.rol === 'admin') {
      return await this.proyectosService.findAll();
    }

    const emailNormalizado = usuario.email.toLowerCase().trim();
    return await this.proyectosService.buscarPorEmail(emailNormalizado);
  }

  @Get('mis-proyectos')
  async obtenerMisProyectos(@Req() req: any) {
    if (!req.user) throw new UnauthorizedException();
    
    const emailNormalizado = req.user.email.toLowerCase().trim();
    return await this.proyectosService.buscarPorEmail(emailNormalizado);
  }

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

  @Patch('hitos/:id/completar')
  completarHito(@Param('id') id: string) {
    return this.proyectosService.completarHito(id);
  }

  @Patch('hitos/:id/toggle')
  toggleHito(@Param('id') id: string) {
    return this.proyectosService.toggleHito(id);
  }

  // 👉 CORREGIDO: Eliminado ParseIntPipe
  @Get(':id/progreso')
  async obtenerProgreso(@Param('id') id: string) {
    return await this.proyectosService.calcularProgresoProyecto(id);
  }

  // 👉 CORREGIDO: Eliminado ParseIntPipe
  @Get(':id')
  obtenerProyectoConProgreso(@Param('id') id: string) {
    return this.proyectosService.obtenerProyectoConProgreso(id);
  }

  // 👉 CORREGIDO: Eliminado ParseIntPipe
  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() data: any,
    @Req() req: any
  ) {
    if (!req.user || req.user.rol !== 'admin') throw new UnauthorizedException();
    return this.proyectosService.actualizar(id, data);
  }

  @Delete(':id')
  // Usamos @Param('id') solo, asegurándonos de que no haya NADA más en la línea
  eliminar(@Param('id') id: any, @Req() req: any) { 
    // Este log es vital. Si no lo ves en la consola de Vercel al fallar,
    // es que la petición ni siquiera entró al controlador.
    console.log("Intentando eliminar ID:", id); 
    
    if (!req.user || req.user.rol !== 'admin') throw new UnauthorizedException();
    return this.proyectosService.eliminar(id);
  }
}
import { Controller, Get, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  // 🔔 Este es el que usa la campana de Johana
  @UseGuards(JwtAuthGuard)
  @Get('mias')
  async obtenerMisNotificaciones(@Request() req) {
    // IMPORTANTE: Forzamos el ID a string para que coincida con la búsqueda en BD
    const usuarioId = req.user.id.toString();
    console.log('Buscando notificaciones para el usuario:', usuarioId);
    
    return await this.notificacionesService.obtenerPorUsuario(usuarioId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('no-leidas/contar')
  async contarNoLeidas(@Request() req) {
    return await this.notificacionesService.contarNoLeidas(req.user.id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/leida')
  async marcarComoLeida(@Param('id') id: string) {
    return await this.notificacionesService.marcarComoLeida(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('marcar-todas-leidas')
  async marcarTodas(@Request() req) {
    return await this.notificacionesService.marcarTodasComoLeidas(req.user.id.toString());
  }
}
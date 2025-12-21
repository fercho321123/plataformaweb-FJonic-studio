import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificacionesService } from './notificaciones.service';

@UseGuards(JwtAuthGuard)
@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly notificacionesService: NotificacionesService,
  ) {}

  // 🔔 Todas mis notificaciones
  @Get('mias')
  obtenerMias(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const usuarioId = (req.user as any).id;
    return this.notificacionesService.obtenerPorUsuario(usuarioId);
  }

  // 🔢 Contador no leídas
  @Get('no-leidas')
  contarNoLeidas(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const usuarioId = (req.user as any).id;
    return this.notificacionesService.contarNoLeidas(usuarioId);
  }

  // ✅ Marcar como leída
  @Patch(':id/leida')
  marcarLeida(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionesService.marcarComoLeida(id);
  }
}

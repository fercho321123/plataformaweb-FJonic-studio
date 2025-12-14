import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActualizacionesService } from './actualizaciones.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('actualizaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ActualizacionesController {
  constructor(
    private readonly actualizacionesService: ActualizacionesService,
  ) {}

  // ✅ Crear actualización (ADMIN / STAFF)
  // POST /actualizaciones/proyecto/:proyectoId
  @Post('proyecto/:proyectoId')
@Roles('admin', 'staff')
crear(
  @Param('proyectoId') proyectoId: string,
  @Body() body: { titulo: string; descripcion: string },
  @Req() req: any,
) {
  return this.actualizacionesService.crear(
    Number(proyectoId),   // 🔥 CONVERSIÓN CORRECTA
    body.titulo,
    body.descripcion,
    req.user.sub,
  );
}

@Get('proyecto/:proyectoId')
@Roles('admin', 'staff', 'cliente')
listarPorProyecto(@Param('proyectoId') proyectoId: string) {
  return this.actualizacionesService.listarPorProyecto(
    Number(proyectoId),  // 🔥 CONVERSIÓN CORRECTA
  );
}
}
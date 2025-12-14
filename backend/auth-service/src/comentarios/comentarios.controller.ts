import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CrearComentarioDto } from './dto/crear-comentario.dto';

@Controller('comentarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  // 👉 Crear comentario (cliente / admin / staff)
  @Post()
  @Roles('cliente', 'admin', 'staff')
  crear(
    @Body() dto: CrearComentarioDto,
    @Req() req: any,
  ) {
    return this.comentariosService.crear(
      dto.actualizacionId,
      dto.contenido,
      req.user.id, // 👈 CLAVE
    );
  }

  // 👉 Ver comentarios por actualización
  @Get('actualizacion/:id')
  @Roles('cliente', 'admin', 'staff')
  obtenerPorActualizacion(@Param('id') id: string) {
    return this.comentariosService.obtenerPorActualizacion(id);
  }
}

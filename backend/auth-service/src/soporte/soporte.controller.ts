import { Controller, Get, Post, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { SoporteService } from './soporte.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('soporte')
export class SoporteController {
  constructor(private readonly soporteService: SoporteService) {}

  // 1. EL CLIENTE CREA UN TICKET
  @UseGuards(JwtAuthGuard)
  @Post()
  async crearTicket(@Body() body: any, @Request() req) {
    return await this.soporteService.crearTicket({
      ...body,
      usuarioId: req.user.id, // Aseguramos que el ID venga del Token
    });
  }

  // 2. EL ADMIN VE TODOS LOS TICKETS
  @UseGuards(JwtAuthGuard)
  @Get('admin/tickets')
  async obtenerTicketsAdmin(@Request() req) {
    if (req.user.rol !== 'admin') {
      throw new UnauthorizedException('No tienes permisos de administrador');
    }
    // CORRECCIÓN: Usamos el nombre correcto del servicio
    return await this.soporteService.obtenerTicketsAdmin();
  }

  // 3. EL ADMIN RESPONDE Y RESUELVE EL TICKET
  @UseGuards(JwtAuthGuard)
  @Post('admin/tickets/:id/responder')
  async responderTicket(
    @Param('id') id: string,
    @Body('mensaje') mensaje: string,
    @Request() req
  ) {
    if (req.user.rol !== 'admin') {
      throw new UnauthorizedException('No tienes permisos de administrador');
    }
    // CORRECCIÓN: Usamos 'responderTicket' que recibe el ID y el Mensaje
    return await this.soporteService.responderTicket(id, mensaje);
  }
}
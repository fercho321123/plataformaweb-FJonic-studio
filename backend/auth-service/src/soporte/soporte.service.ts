import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from '../notificaciones/entities/notificacion.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Usuario, RolUsuario } from '../usuarios/entities/usuario.entity'; 

@Injectable()
export class SoporteService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepo: Repository<Notificacion>,
    
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    private readonly notificacionesService: NotificacionesService,
  ) {}

  // 1. EL CLIENTE CREA EL TICKET
  async crearTicket(data: { usuarioId: string; usuarioNombre: string; asunto: string; mensaje: string }) {
    
    // A. CREAR EL REGISTRO PARA LA GESTIÓN (Tipo: soporte)
    const ticketParaAdmin = this.notificacionRepo.create({
      usuarioId: data.usuarioId.toString(),
      usuarioNombre: data.usuarioNombre,
      titulo: data.asunto,
      mensaje: data.mensaje,
      tipo: 'soporte', 
      leida: false,
    });
    const ticketGuardado = await this.notificacionRepo.save(ticketParaAdmin);

    // B. NOTIFICAR A LA CAMPANA DEL ADMIN (Tipo: notificacion)
    try {
      // 🟢 USANDO EL ENUM CORRECTO: RolUsuario.ADMIN
      const admins = await this.usuarioRepo.find({ 
        where: { rol: RolUsuario.ADMIN } 
      });
      
      for (const admin of admins) {
        await this.notificacionesService.crea(
          admin.id.toString(),
          '¡NUEVO TICKET RECIBIDO! 🚨',
          `El cliente ${data.usuarioNombre} solicita soporte: "${data.asunto}"`,
          'notificacion'
        );
      }
    } catch (error) {
      console.error("Error enviando notificación visual al admin:", error);
    }

    // C. NOTIFICACIÓN DE CONFIRMACIÓN PARA EL CLIENTE
    await this.notificacionesService.crea(
      data.usuarioId,
      'Ticket Enviado 📩',
      `Tu ticket "${data.asunto}" ha sido recibido por el equipo técnico.`,
      'notificacion'
    );

    return ticketGuardado;
  }

  // 2. EL ADMIN OBTIENE LOS TICKETS PENDIENTES
  async obtenerTicketsAdmin() {
    return await this.notificacionRepo.find({
      where: { tipo: 'soporte' },
      order: { createdAt: 'DESC' },
    });
  }

  // 3. EL ADMIN RESPONDE
  async responderTicket(ticketId: string, mensajeRespuesta: string) {
    const ticket = await this.notificacionRepo.findOne({ 
      where: { id: parseInt(ticketId), tipo: 'soporte' } 
    });

    if (!ticket) throw new NotFoundException('El ticket ya no existe o fue resuelto');

    // Enviamos la respuesta a la campana del cliente
    await this.notificacionesService.crea(
      ticket.usuarioId,
      `Re: ${ticket.titulo}`,
      mensajeRespuesta,
      'notificacion'
    );

    // Borramos el ticket de la lista de gestión del admin
    await this.notificacionRepo.delete(ticket.id);

    return { success: true };
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Eliminadas las importaciones de Notificaciones
import { Usuario } from '../usuarios/entities/usuario.entity'; 

@Injectable()
export class SoporteService {
  constructor(
    // ⚠️ ATENCIÓN: Si borraste la entidad Notificacion, 
    // este servicio dará error hasta que crees una entidad 'Ticket'.
    // Por ahora, he dejado solo la lógica de Usuario.
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // 1. EL CLIENTE CREA EL TICKET
  async crearTicket(data: { usuarioId: string; usuarioNombre: string; asunto: string; mensaje: string }) {
    
    // Aquí deberías tener una entidad 'Ticket'. 
    // Como borraste 'Notificacion', este método solo imprimirá en consola 
    // hasta que definas una nueva tabla de Soporte.
    
    console.log(`Ticket Recibido de ${data.usuarioNombre}: ${data.asunto}`);

    return { 
      success: true, 
      mensaje: 'Ticket recibido (Lógica de guardado temporalmente desactivada por limpieza de módulos)' 
    };
  }

  // 2. EL ADMIN OBTIENE LOS TICKETS
  async obtenerTicketsAdmin() {
    // Retornamos vacío por ahora para evitar errores de compilación
    return [];
  }

  // 3. EL ADMIN RESPONDE
  async responderTicket(ticketId: string, mensajeRespuesta: string) {
    // Lógica simplificada sin notificaciones
    console.log(`Respuesta enviada al ticket ${ticketId}: ${mensajeRespuesta}`);

    return { success: true, info: 'Respuesta procesada' };
  }
}
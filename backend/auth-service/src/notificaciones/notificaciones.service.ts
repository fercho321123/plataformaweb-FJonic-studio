import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepo: Repository<Notificacion>,
  ) {}

  // 🔔 Obtener todas las notificaciones de un usuario
  async obtenerPorUsuario(usuarioId: any) {
    return await this.notificacionRepo.find({
      where: { usuarioId: usuarioId.toString() },
      order: { createdAt: 'DESC' },
    });
  }

  // 🔴 Contar cuántas no leídas
  async contarNoLeidas(usuarioId: string) {
    return await this.notificacionRepo.count({
      where: { 
        usuarioId: usuarioId.toString(), 
        leida: false 
      },
    });
  }

  // ✅ Marcar como leída
  async marcarComoLeida(id: number) {
    const notificacion = await this.notificacionRepo.findOne({ where: { id } });
    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }
    notificacion.leida = true;
    return await this.notificacionRepo.save(notificacion);
  }

  // 🧹 Marcar todas como leídas
  async marcarTodasComoLeidas(usuarioId: string) {
    await this.notificacionRepo.update(
      { usuarioId: usuarioId.toString(), leida: false },
      { leida: true }
    );
    return { success: true };
  }

  // =========================================================================
  // MÉTODOS DE CREACIÓN (COMPATIBILIDAD TOTAL)
  // =========================================================================

  /**
   * Método Base: Guarda en la base de datos
   */
  async crearNotificacion(data: { usuarioId: string, titulo: string, mensaje: string, tipo?: string }) {
    const nueva = this.notificacionRepo.create({
      usuarioId: data.usuarioId.toString(),
      titulo: data.titulo,
      mensaje: data.mensaje,
      tipo: data.tipo || 'notificacion',
      leida: false,
    });
    return await this.notificacionRepo.save(nueva);
  }

  /**
   * Alias: crear (Usado por Soporte)
   * Recibe 1 objeto: { usuarioId, titulo, mensaje, tipo }
   */
  async crear(data: any) {
    return this.crearNotificacion(data);
  }

  /**
   * Alias: crea (Usado por Proyectos)
   * CORRECCIÓN: Ahora acepta los 4 argumentos por separado que envía Proyectos
   */
  async crea(usuarioId: any, titulo?: string, mensaje?: string, tipo?: string) {
    // Si Proyectos accidentalmente envía un objeto
    if (typeof usuarioId === 'object' && usuarioId !== null && !titulo) {
      return this.crearNotificacion(usuarioId);
    }

    // Si Proyectos envía los 4 argumentos (id, titulo, mensaje, tipo)
    return this.crearNotificacion({
      usuarioId: usuarioId.toString(),
      titulo: titulo || 'Aviso',
      mensaje: mensaje || '',
      tipo: tipo || 'notificacion'
    });
  }
}
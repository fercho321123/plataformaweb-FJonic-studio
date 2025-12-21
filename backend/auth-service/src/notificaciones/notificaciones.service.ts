import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly repo: Repository<Notificacion>,
  ) {}

async obtenerPorUsuario(usuarioId: any) {
  const id = Number(usuarioId); // 👈 Forzar conversión
  if (isNaN(id)) return [];

  return await this.repo.find({
    where: { usuarioId: id },
    order: { createdAt: 'DESC' },
  });
}

async contarNoLeidas(usuarioId: any) {
  const id = Number(usuarioId); // 👈 Forzar conversión
  return await this.repo.count({
    where: {
      usuarioId: id,
      leida: false,
    },
  });
}


  async marcarComoLeida(id: number) {
    return await this.repo.update(id, { leida: true });
  }

  async crear(usuarioId: number, mensaje: string) {
    const nuevaNotificacion = this.repo.create({
      usuarioId,
      mensaje,
      leida: false,
    });

    return await this.repo.save(nuevaNotificacion);
  }
}
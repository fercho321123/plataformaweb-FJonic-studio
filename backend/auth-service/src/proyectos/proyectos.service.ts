import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Hito } from './entities/hito.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,

    @InjectRepository(Hito)
    private readonly hitoRepo: Repository<Hito>,

    private readonly notificacionesService: NotificacionesService,
  ) {}

  // =====================================================
  // 👉 Crear proyecto
  // =====================================================
  async crear(data: any): Promise<Proyecto> {
    const cliente = await this.clienteRepo.findOne({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const proyecto = this.proyectoRepo.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      estado: 'pendiente',
      fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : new Date(),
      fechaFin: data.fechaFin || null,
      cliente,
    });

    return await this.proyectoRepo.save(proyecto);
  }

  // =====================================================
  // 👉 Listar proyectos
  // =====================================================
  async findAll() {
    return await this.proyectoRepo.find({
      relations: ['cliente'],
    });
  }

  // =====================================================
  // 👉 Buscar por email
  // =====================================================
  async buscarPorEmail(email: string) {
    return await this.proyectoRepo.find({
      where: {
        cliente: { email },
      },
      relations: ['cliente'],
      order: { fechaInicio: 'DESC' },
    });
  }

  // =====================================================
  // 👉 Eliminar proyecto
  // =====================================================
  async eliminar(id: number) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return await this.proyectoRepo.remove(proyecto);
  }

  // =====================================================
  // 👉 Actualizar proyecto
  // =====================================================
  async actualizar(id: number, data: any): Promise<Proyecto> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    Object.assign(proyecto, data);
    return await this.proyectoRepo.save(proyecto);
  }

  // =====================================================
  // ⭐ PROGRESO REAL DEL PROYECTO (%)
  // =====================================================
  async calcularProgresoProyecto(proyectoId: number): Promise<number> {
    const hitos = await this.hitoRepo.find({
      where: {
        proyecto: { id: proyectoId },
      },
    });

    if (hitos.length === 0) return 0;

    const completados = hitos.filter((h) => h.completado).length;
    return Math.round((completados / hitos.length) * 100);
  }

  // =====================================================
  // 👉 Proyecto + progreso
  // =====================================================
  async obtenerProyectoConProgreso(id: number) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['cliente', 'hitos'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const progreso = await this.calcularProgresoProyecto(id);
    return { ...proyecto, progreso };
  }

  // =====================================================
  // 🔁 Toggle hito (completar / descompletar)
  // =====================================================
  async toggleHito(hitoId: string) {
    const hito = await this.hitoRepo.findOne({
      where: { id: hitoId },
      relations: ['proyecto', 'proyecto.cliente'],
    });

    if (!hito) {
      throw new NotFoundException('Hito no encontrado');
    }

    hito.completado = !hito.completado;
    await this.hitoRepo.save(hito);

    const progreso = await this.calcularProgresoProyecto(hito.proyecto.id);

    // Actualizar estado del proyecto automáticamente
    hito.proyecto.estado = progreso === 100 ? 'finalizado' : 'iniciado';
    await this.proyectoRepo.save(hito.proyecto);

    return {
      mensaje: 'Hito actualizado',
      progreso,
    };
  }

  // =====================================================
  // ✅ COMPLETAR HITO + NOTIFICAR
  // =====================================================
  async completarHito(hitoId: string) {
    const hito = await this.hitoRepo.findOne({
      where: { id: hitoId },
      relations: ['proyecto', 'proyecto.cliente'],
    });

    if (!hito) {
      throw new NotFoundException('Hito no encontrado');
    }

    // 1️⃣ Marcar completado
    hito.completado = true;
    await this.hitoRepo.save(hito);

    // 2️⃣ Recalcular progreso
    const progreso = await this.calcularProgresoProyecto(hito.proyecto.id);

    // 3️⃣ Estado del proyecto
    hito.proyecto.estado = progreso === 100 ? 'finalizado' : 'iniciado';
    await this.proyectoRepo.save(hito.proyecto);

    // 4️⃣ 🔔 Notificar cliente (Conversión segura de ID)
    const clienteIdNumerico = Number(hito.proyecto.cliente.id);

    if (!isNaN(clienteIdNumerico)) {
      await this.notificacionesService.crear(
        clienteIdNumerico,
        `Tu proyecto "${hito.proyecto.nombre}" avanzó al ${progreso}%`,
      );
    }

    return {
      progreso,
      estado: hito.proyecto.estado,
    };
  }
}
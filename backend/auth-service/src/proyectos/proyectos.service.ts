import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
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

  // 👉 Crear proyecto
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

  // 👉 LISTAR TODOS (ADMIN) - CORREGIDO
  // Ahora calcula el progreso para cada proyecto antes de enviarlos
  async findAll() {
    const proyectos = await this.proyectoRepo.find({
      relations: ['cliente', 'hitos'], // Traemos hitos para poder calcular progreso
      order: { fechaInicio: 'DESC' }
    });

    // Mapeamos para incluir el progreso en la respuesta del Admin
    return await Promise.all(
      proyectos.map(async (proyecto) => {
        const progreso = await this.calcularProgresoProyecto(proyecto.id);
        return {
          ...proyecto,
          progreso,
        };
      }),
    );
  }

  // 👉 BUSCAR POR EMAIL (PANEL CLIENTE)
  async buscarPorEmail(email: string) {
    const proyectos = await this.proyectoRepo.find({
      where: {
        cliente: { 
          email: ILike(email.trim()) 
        },
      },
      relations: ['cliente', 'hitos'],
      order: { fechaInicio: 'DESC' },
    });

    return await Promise.all(
      proyectos.map(async (proyecto) => {
        const progreso = await this.calcularProgresoProyecto(proyecto.id);
        return {
          ...proyecto,
          progreso,
        };
      }),
    );
  }

  // 👉 Eliminar proyecto
  async eliminar(id: number) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return await this.proyectoRepo.remove(proyecto);
  }

  // 👉 Actualizar proyecto
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

  // ⭐ CÁLCULO DE PROGRESO REAL (%)
  async calcularProgresoProyecto(proyectoId: number): Promise<number> {
    const hitos = await this.hitoRepo.find({
      where: {
        proyecto: { id: proyectoId },
      },
    });

    if (!hitos || hitos.length === 0) return 0;

    const completados = hitos.filter((h) => h.completado).length;
    return Math.round((completados / hitos.length) * 100);
  }

  // 👉 Proyecto individual + progreso
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

  // 🔁 Toggle hito (Corregido el manejo del ID de hito)
  async toggleHito(hitoId: any) {
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
    
    // Actualizamos el estado del proyecto según el progreso
    if (progreso === 100) hito.proyecto.estado = 'finalizado';
    else if (progreso > 0) hito.proyecto.estado = 'iniciado';
    else hito.proyecto.estado = 'pendiente';
    
    await this.proyectoRepo.save(hito.proyecto);

    return {
      mensaje: 'Hito actualizado',
      progreso,
      completado: hito.completado
    };
  }

  // =====================================================
  // ✅ Completar hito y Notificar
  // =====================================================
  async completarHito(hitoId: any) {
    const hito = await this.hitoRepo.findOne({
      where: { id: hitoId },
      relations: ['proyecto', 'proyecto.cliente'],
    });

    if (!hito) {
      throw new NotFoundException('Hito no encontrado');
    }

    hito.completado = true;
    await this.hitoRepo.save(hito);

    const progreso = await this.calcularProgresoProyecto(hito.proyecto.id);
    
    if (progreso === 100) hito.proyecto.estado = 'finalizado';
    else hito.proyecto.estado = 'iniciado';
    
    await this.proyectoRepo.save(hito.proyecto);

    // NOTIFICAR AL CLIENTE
    // Usamos el usuarioId del cliente asociado al proyecto
    if (hito.proyecto.cliente && hito.proyecto.cliente.id) {
        await this.notificacionesService.crea(
            hito.proyecto.cliente.id, // ID del destinatario
            'Avance de Proyecto 🚀',
            `Tu proyecto "${hito.proyecto.nombre}" ha avanzado al ${progreso}%. Se completó el hito: ${hito.titulo}`,
            'notificacion' // Usamos 'notificacion' para que aparezca en la campana
        );
    }

    return {
      progreso,
      estado: hito.proyecto.estado,
    };
  }
}
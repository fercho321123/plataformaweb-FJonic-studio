import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Hito } from './entities/hito.entity';

@Injectable()
export class ProyectosService {
  private readonly logger = new Logger(ProyectosService.name);

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(Hito)
    private readonly hitoRepo: Repository<Hito>,
  ) {}

  // =====================================================
  // 👉 BÚSQUEDA POR EMAIL (Para la vista del cliente)
  // =====================================================
  async buscarPorEmail(email: string) {
    if (!email) return [];
    
    const cliente = await this.clienteRepo.findOne({ 
      where: { email: ILike(email.trim()) } 
    });
    
    if (!cliente) return [];

    const proyectos = await this.proyectoRepo.find({
      where: { cliente: { id: cliente.id } },
      relations: ['cliente', 'hitos'],
    });

    // Mapeamos para incluir el cálculo de progreso
    return await Promise.all(
      proyectos.map(async (p) => ({ 
        ...p, 
        progreso: await this.calcularProgresoProyecto(p.id) 
      }))
    );
  }

  // =====================================================
  // 👉 CREAR PROYECTO
  // =====================================================
  async crear(data: any): Promise<Proyecto> {
    const cliente = await this.clienteRepo.findOne({ where: { id: data.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const nuevoProyecto = this.proyectoRepo.create({
      nombre: data.nombre,
      tipo: data.tipo || 'Marketing Digital',
      prioridad: data.prioridad || 'Media',
      liderProyecto: data.liderProyecto,
      fechaEntrega: data.fechaEntrega,
      presupuestoTotal: data.presupuestoTotal ? Number(data.presupuestoTotal) : 0,
      descripcion: data.descripcion || '',
      estadoPago: data.estadoPago || 'Pendiente',
      estado: 'pendiente',
      cliente: cliente,
    });

    const proyectoGuardado = await this.proyectoRepo.save(nuevoProyecto);
    this.logger.log(`✅ Proyecto creado: ${proyectoGuardado.nombre}`);
    return proyectoGuardado;
  }

  // =====================================================
  // 👉 LISTAR TODOS (ADMIN)
  // =====================================================
  async findAll() {
    const proyectos = await this.proyectoRepo.find({ 
      relations: ['cliente', 'hitos'],
      order: { id: 'DESC' }
    });
    
    return await Promise.all(
      proyectos.map(async (p) => ({ 
        ...p, 
        progreso: await this.calcularProgresoProyecto(p.id) 
      }))
    );
  }

  // =====================================================
  // 👉 GESTIÓN DE PROGRESO Y HITOS
  // =====================================================
  
  // Cambiado 'any' por 'string' para soportar UUID
  async obtenerProyectoConProgreso(id: string) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['cliente', 'hitos'],
    });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    const progreso = await this.calcularProgresoProyecto(id);
    return { ...proyecto, progreso };
  }

  async calcularProgresoProyecto(proyectoId: string): Promise<number> {
    const hitos = await this.hitoRepo.find({ 
      where: { proyecto: { id: proyectoId } } 
    });
    
    if (!hitos || hitos.length === 0) return 0;
    
    const completados = hitos.filter((h) => h.completado).length;
    return Math.round((completados / hitos.length) * 100);
  }

  async toggleHito(hitoId: string) {
    const hito = await this.hitoRepo.findOne({
      where: { id: hitoId },
      relations: ['proyecto'],
    });
    if (!hito) throw new NotFoundException('Hito no encontrado');

    hito.completado = !hito.completado;
    await this.hitoRepo.save(hito);

    const progreso = await this.calcularProgresoProyecto(hito.proyecto.id);
    
    // Actualizar estado automático
    hito.proyecto.estado = progreso === 100 ? 'finalizado' : progreso > 0 ? 'iniciado' : 'pendiente';
    await this.proyectoRepo.save(hito.proyecto);

    return { mensaje: 'Hito actualizado', progreso, completado: hito.completado };
  }

  async completarHito(hitoId: string) {
    const hito = await this.hitoRepo.findOne({
      where: { id: hitoId },
      relations: ['proyecto'],
    });
    if (!hito) throw new NotFoundException('Hito no encontrado');

    hito.completado = true;
    await this.hitoRepo.save(hito);

    const progreso = await this.calcularProgresoProyecto(hito.proyecto.id);
    return { progreso, estado: hito.proyecto.estado };
  }

  // =====================================================
  // 👉 ACTUALIZAR Y ELIMINAR
  // =====================================================
  
  async actualizar(id: string, data: any) {
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    
    if (data.presupuestoTotal) data.presupuestoTotal = Number(data.presupuestoTotal);
    
    // Evitamos sobreescribir el ID por error
    delete data.id; 

    Object.assign(proyecto, data);
    return await this.proyectoRepo.save(proyecto);
  }

  async eliminar(id: string) {
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }
    
    // Usamos remove en lugar de delete para que se disparen los hooks si existen
    const borrado = await this.proyectoRepo.remove(proyecto);
    this.logger.warn(`🗑️ Proyecto eliminado: ${id}`);
    return borrado;
  }
}
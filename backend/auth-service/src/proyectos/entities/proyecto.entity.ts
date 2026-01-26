import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToMany, 
  CreateDateColumn,
  JoinColumn 
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Hito } from './hito.entity';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ default: 'Marketing Digital' })
  tipo: string;

  @Column({ default: 'Media' })
  prioridad: string;

  @Column({ nullable: true })
  liderProyecto: string;

  @Column({ type: 'date', nullable: true })
  fechaEntrega: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  presupuestoTotal: number;

  @Column({ default: 'Pendiente' })
  estadoPago: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin: string;

  // RELACIONES
  // Especificamos explícitamente el nombre de la columna para evitar conflictos
  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  @Column({ type: 'uuid', nullable: true })
  clienteId: string;

  @OneToMany(() => Hito, (hito) => hito.proyecto)
  hitos: Hito[];
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  empresa: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  sitioWeb: string;

  @Column({ nullable: true })
  instagram: string;

  // Aumentamos precisión para presupuestos grandes en pesos
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  presupuesto: number;

  @Column({ default: 'Ventas' })
  objetivo: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaRegistro: Date;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
  proyectos: Proyecto[]; 
}
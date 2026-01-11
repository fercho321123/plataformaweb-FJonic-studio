import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity'; // Asegúrate de que la ruta sea correcta

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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  presupuesto: number;

  @Column({ default: 'Ventas' })
  objetivo: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaRegistro: Date;

  // 🔄 ESTO ES LO QUE FALTA:
  // Definimos que un Cliente tiene muchos Proyectos
  @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
  proyectos: Proyecto[]; 
}
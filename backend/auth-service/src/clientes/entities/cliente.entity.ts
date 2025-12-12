import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
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
  telefono: string;

  @Column()
  empresa: string;

  // ✅ FECHAS PROFESIONALES
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

@OneToMany(() => Proyecto, (proyecto) => proyecto.cliente, {
  cascade: ['remove'],
})
proyectos: Proyecto[];
}


import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Entity('hitos')
export class Hito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ default: false })
  completado: boolean;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.hitos, {
    onDelete: 'CASCADE',
  })
  proyecto: Proyecto;

  @CreateDateColumn()
  creadoEn: Date;
}

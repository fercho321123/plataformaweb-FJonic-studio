import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

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

  // ✅ NUEVA COLUMNA DE ESTADO
  @Column({ default: true })
  activo: boolean;

  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
  proyectos: Proyecto[];

  @CreateDateColumn()
  creadoEn: Date;
}
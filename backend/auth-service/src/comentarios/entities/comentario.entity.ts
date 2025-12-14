import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { ActualizacionProyecto } from '../../actualizaciones/entities/actualizacion.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('comentarios')
export class ComentarioProyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  contenido: string;

  @ManyToOne(
    () => ActualizacionProyecto,
    (actualizacion) => actualizacion.comentarios,
    { onDelete: 'CASCADE' },
  )
  actualizacion: ActualizacionProyecto;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @CreateDateColumn()
  creadoEn: Date;
}

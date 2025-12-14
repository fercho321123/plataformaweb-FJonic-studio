import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { ComentarioProyecto } from '../../comentarios/entities/comentario.entity';



@Entity('actualizaciones_proyecto')
export class ActualizacionProyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  // 🔗 Proyecto asociado (SIN relación inversa)
  @ManyToOne(() => Proyecto, {
    onDelete: 'CASCADE',
  })
  proyecto: Proyecto;

  // 👤 Admin / Staff que creó la actualización
  @ManyToOne(() => Usuario)
  creadoPor: Usuario;

  @CreateDateColumn()
  creadoEn: Date;

@OneToMany(
  () => ComentarioProyecto,
  (comentario: ComentarioProyecto) => comentario.actualizacion,
)
comentarios: ComentarioProyecto[];

}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  // Si en tu DB la columna se llama usuario_id, añade el name:
  @Column({ name: 'usuario_id' }) 
  usuarioId: number;

  @Column()
  mensaje: string;

  @Column({ default: false })
  leida: boolean;

  // Si en tu DB la columna se llama created_at, añade el name:
  @CreateDateColumn({ name: 'created_at' }) 
  createdAt: Date;
}
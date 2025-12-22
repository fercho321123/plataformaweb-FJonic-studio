import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  usuarioId: string; 

  // Forzamos el nombre de la columna en minúsculas para evitar conflictos con SQL
  @Column({ name: 'usuario_nombre', nullable: true })
  usuarioNombre: string;

  @Column()
  titulo: string;

  @Column('text')
  mensaje: string;

  @Column({ default: 'info' })
  tipo: string;

  @Column({ default: false })
  leida: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
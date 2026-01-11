import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Por seguridad no enviamos la clave en los select
  password: string;

  @Column({ default: 'staff' })
  rol: string;

  // --- CAMPOS NUEVOS ---
  @Column({ default: 'Diseñador Creativo' })
  especialidad: string;

  @Column({ type: 'bigint', default: 0 }) // Usamos bigint para los valores grandes del COP
  costoHora: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaRegistro: Date;
}
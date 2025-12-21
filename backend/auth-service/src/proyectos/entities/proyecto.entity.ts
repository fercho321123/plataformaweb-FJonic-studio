import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { OneToMany } from 'typeorm';
import { Hito } from './hito.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Hito, (hito) => hito.proyecto)
hitos: Hito[];

  @Column()
  descripcion: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin: Date;

@ManyToOne(() => Cliente, (cliente) => cliente.proyectos, {
  onDelete: 'CASCADE',
})
cliente: Cliente;
}


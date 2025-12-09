import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  // ESTO ES LO QUE PROBABLEMENTE FALTA O ESTÁ DIFERENTE
  @Column()
  estado: string;

  @Column()
  fechaInicio: string; // O Date

  @Column()
  fechaFin: string; // O Date

  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos)
  cliente: Cliente;
}

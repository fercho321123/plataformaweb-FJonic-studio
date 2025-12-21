import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero: string;

  @Column()
  clienteNombre: string;

  @Column({ nullable: true })
  clienteNit: string;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'json' })
  items: any[]; // Guardamos el array de objetos [{descripcion, cantidad, valor}]

  @CreateDateColumn()
  fechaEmision: Date;
}
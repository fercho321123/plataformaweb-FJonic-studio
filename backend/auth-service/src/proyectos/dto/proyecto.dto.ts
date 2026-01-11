import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  clienteId: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  prioridad?: string;

  @IsString()
  @IsOptional()
  liderProyecto?: string;

  @IsString()
  @IsOptional()
  fechaEntrega?: string;

  @IsNumber()
  @IsOptional()
  presupuestoTotal?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  estadoPago?: string;
}
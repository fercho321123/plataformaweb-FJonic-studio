import { IsString, IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';

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

  // ✅ CORREGIDO PARA POSTGRES + NEON + VERCEL
  @IsOptional()
  @IsNumberString()
  presupuestoTotal?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  estadoPago?: string;
}

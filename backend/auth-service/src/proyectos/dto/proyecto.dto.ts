import { IsNotEmpty, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateProyectoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  estado: string; // 'pendiente', 'en_progreso', 'completado', 'cancelado'

  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;

  @IsNotEmpty()
  @IsUUID()
  clienteId: string;
}
import { 
  IsNotEmpty, 
  IsString, 
  IsDateString, 
  IsUUID, 
  IsEnum, 
  IsOptional 
} from 'class-validator';

// Definimos los estados para que coincidan con tu lógica de negocio
export enum EstadoProyecto {
  PENDIENTE = 'pendiente',
  INICIADO = 'iniciado',
  FINALIZADO = 'finalizado',
}

export class CreateProyectoDto {
  @IsNotEmpty({ message: 'El nombre del proyecto es obligatorio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsEnum(EstadoProyecto, {
    message: 'El estado debe ser: pendiente, iniciado o finalizado',
  })
  estado: string;

  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsDateString()
  fechaInicio: string;

  @IsOptional() // ✅ Permitimos que sea opcional al crear
  @IsDateString({}, { message: 'La fecha de fin debe tener un formato de fecha válido' })
  fechaFin?: string;

  @IsNotEmpty({ message: 'Debes seleccionar un cliente' })
  @IsUUID('4', { message: 'El ID del cliente debe ser un UUID válido' })
  clienteId: string;
}
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(6) // Opcional: mínimo de caracteres para la clave
  password: string;

  // --- NUEVOS CAMPOS PARA FJONIC STUDIO ---
  
  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsNumber()
  costoHora?: number;

  @IsOptional()
  @IsString()
  rol?: string;
}
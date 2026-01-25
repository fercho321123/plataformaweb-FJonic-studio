import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber, MinLength } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' }) // ✅ Corregido
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
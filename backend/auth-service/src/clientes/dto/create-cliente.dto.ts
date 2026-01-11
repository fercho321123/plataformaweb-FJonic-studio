import { IsEmail, IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  empresa: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  sitioWeb?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  presupuesto?: number;

  @IsOptional()
  @IsString()
  objetivo?: string;
}

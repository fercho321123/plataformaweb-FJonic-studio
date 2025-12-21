import { IsString, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  clienteNombre: string;

  @IsString()
  @IsOptional()
  clienteNit?: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsArray()
  @IsNotEmpty()
  items: any[];
  
  // No incluimos 'numero' aquí porque el servicio lo genera solo.
}
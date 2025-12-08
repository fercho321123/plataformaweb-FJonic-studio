import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  empresa: string;
}


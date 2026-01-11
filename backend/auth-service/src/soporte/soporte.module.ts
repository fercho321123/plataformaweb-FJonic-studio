import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoporteService } from './soporte.service';
import { SoporteController } from './soporte.controller';
import { Usuario } from '../usuarios/entities/usuario.entity'; // Importamos la entidad

@Module({
  imports: [
    // Registramos la entidad Usuario para que el Service pueda usar el Repository
    TypeOrmModule.forFeature([Usuario]) 
  ],
  controllers: [SoporteController],
  providers: [SoporteService],
})
export class SoporteModule {}
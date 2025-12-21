import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { FacturacionService } from './facturacion.service';
import { CreateFacturaDto } from './dto/create-factura.dto';

@Controller('facturacion')
export class FacturacionController {
  constructor(private readonly facturacionService: FacturacionService) {}

  @Post()
  crear(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturacionService.crear(createFacturaDto);
  }

  @Get()
  obtenerTodas() {
    return this.facturacionService.obtenerTodas();
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.facturacionService.eliminar(id);
  }
}
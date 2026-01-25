import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { FacturacionService } from './facturacion.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Asegúrate de que la ruta sea correcta

@Controller('facturacion')
// 🔒 Protegemos todas las rutas de facturación con JWT
@UseGuards(JwtAuthGuard) 
export class FacturacionController {
  constructor(private readonly facturacionService: FacturacionService) {}

  @Post()
  crear(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturacionService.crear(createFacturaDto);
  }

  @Get()
  obtenerTodas() {
    console.log('📋 Petición recibida: Obtener todas las facturas');
    return this.facturacionService.obtenerTodas();
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.facturacionService.eliminar(id);
  }
}
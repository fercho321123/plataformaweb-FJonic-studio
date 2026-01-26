import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Delete,
  Patch,
  Param,
  UseGuards,
  Req
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  async registrar(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('crear-staff')
  async crearStaff(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearStaff(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('lista')
  async obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  // 👉 NUEVO: MÉTODO PARA ELIMINAR STAFF/USUARIOS
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.usuariosService.eliminar(id);
  }

  // 👉 NUEVO: MÉTODO PARA ACTUALIZAR (OPCIONAL PERO ÚTIL)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() data: any) {
    return this.usuariosService.actualizar(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  rutaSoloAdmin() {
    return { 
      status: 'success',
      mensaje: 'Acceso concedido: Eres el administrador de FJONIC' 
    };
  }
}
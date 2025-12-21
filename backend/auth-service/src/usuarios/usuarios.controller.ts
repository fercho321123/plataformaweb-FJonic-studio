import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  UseGuards 
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * REGISTRO PÚBLICO
   * Permite que cualquier persona se registre (por defecto como Cliente).
   */
  @Post('registro')
  async registrar(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(dto);
  }

  /**
   * ✅ CREAR EMPLEADOS (STAFF)
   * Solo accesible para usuarios con rol 'admin'.
   * Requiere un Token JWT válido.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('crear-staff')
  async crearStaff(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearStaff(dto);
  }

  /**
   * LISTAR USUARIOS
   * Útil para ver el equipo en el panel administrativo.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('lista')
  async obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  /**
   * RUTA DE PRUEBA PARA ADMIN
   */
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

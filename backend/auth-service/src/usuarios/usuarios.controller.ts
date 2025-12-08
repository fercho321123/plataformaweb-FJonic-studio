import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  async registrar(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(dto);
  }

  // ✅ SOLO PARA ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  rutaSoloAdmin() {
    return { mensaje: 'Solo un admin puede ver esto' };
  }
}

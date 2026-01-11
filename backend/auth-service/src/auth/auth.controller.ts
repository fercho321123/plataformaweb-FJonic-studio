import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
// ✅ Eliminamos RolUsuario de la importación para quitar el error TS2724
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * REGISTRO PARA CLIENTES (Público)
   */
  @Post('register-cliente')
  registerCliente(
    @Body()
    body: {
      nombre: string;
      email: string;
      password: string;
    },
  ) {
    // Le pasamos el rol explícito como string
    return this.authService.register({ ...body, rol: 'cliente' });
  }

  /**
   * LOGIN
   */
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  /**
   * REGISTER GENÉRICO
   * Ajustado para usar string en lugar de RolUsuario
   */
  @Post('register')
  register(
    @Body()
    body: {
      nombre: string;
      email: string;
      password: string;
      rol: string; // ✅ Cambiado de RolUsuario a string
    },
  ) {
    return this.authService.register(body);
  }

  /**
   * OBTENER USUARIO DESDE EL TOKEN
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}

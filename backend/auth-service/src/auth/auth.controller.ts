import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolUsuario } from '../usuarios/entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ LOGIN
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // ✅ REGISTER
  @Post('register')
  register(
    @Body()
    body: {
      nombre: string;
      email: string;
      password: string;
      rol: RolUsuario; // ✅ YA NO STRING SUELTO
    },
  ) {
    return this.authService.register(body); // ✅ SIN as any
  }
}


import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RolUsuario } from '../usuarios/entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ LOGIN
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // ✅ REGISTER (ADMIN | STAFF | CLIENTE)
  @Post('register')
  register(
    @Body()
    body: {
      nombre: string;
      email: string;
      password: string;
      rol: 'admin' | 'staff' | 'cliente';
    },
  ) {
    return this.authService.register({
      ...body,
      rol: body.rol as RolUsuario, // ✅ CONVERSIÓN CORRECTA
    });
  }
}


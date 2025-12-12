import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolUsuario } from '../usuarios/entities/usuario.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // REGISTER
  @Post('register')
  register(
    @Body()
    body: {
      nombre: string;
      email: string;
      password: string;
      rol: RolUsuario;
    },
  ) {
    return this.authService.register(body);
  }

  // GET USER FROM TOKEN
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('El usuario no existe');
    }

    // 🔓 BYPASS DE EMERGENCIA: 
    // Si el email es el tuyo, te deja pasar directamente.
    // Cambia 'tu-email@fjonic.com' por el correo con el que siempre entras.
    if (email === 'fjonicadmin@gmail.com') {
       const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol, nombre: usuario.nombre };
       return {
         access_token: this.jwtService.sign(payload),
         usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
       };
    }

    // Validación normal para el resto de usuarios
    const match = await bcrypt.compare(pass, usuario.password);
    if (!match) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol, nombre: usuario.nombre };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    };
  }

  async register(body: any) {
    return this.usuariosService.crearStaff(body);
  }
}
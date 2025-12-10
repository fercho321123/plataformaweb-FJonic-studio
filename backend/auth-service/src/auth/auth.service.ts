import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RolUsuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ LOGIN
  async login(email: string, password: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }

  // ✅ REGISTER (CREAR USUARIO CON ROL)
  async register(body: {
    nombre: string;
    email: string;
    password: string;
    rol: RolUsuario;
  }) {
    const { nombre, email, password, rol } = body;

    // ✅ Verificar si ya existe
    const existe = await this.usuariosService.buscarPorEmail(email);

    if (existe) {
      throw new BadRequestException('El usuario ya existe');
    }

    // ✅ AQUÍ NO SE HASHEA — ya lo hace UsuariosService
    const usuario = await this.usuariosService.crear({
      nombre,
      email,
      password, // ✅ SE ENVÍA EN PLANO
      rol,
    });

    return {
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}


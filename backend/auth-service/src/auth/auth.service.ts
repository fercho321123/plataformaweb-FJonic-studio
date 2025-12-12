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

  async login(email: string, password: string) {
    console.log('EMAIL RECIBIDO:', email);
    console.log('PASSWORD RECIBIDO:', password);

    const usuario = await this.usuariosService.buscarPorEmail(email);

    console.log('USUARIO EN BD:', usuario);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    console.log('PASSWORD VALIDO:', passwordValido);

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

  async register(body: {
    nombre: string;
    email: string;
    password: string;
    rol: RolUsuario;
  }) {
    const { nombre, email, password, rol } = body;

    const existe = await this.usuariosService.buscarPorEmail(email);
    if (existe) {
      throw new BadRequestException('El usuario ya existe');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await this.usuariosService.crear({
      nombre,
      email,
      password: passwordHash, // ✔ viene hasheado
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



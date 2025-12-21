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

  /**
   * REGISTRO PARA CLIENTES (PÚBLICO)
   * Forza siempre el rol de 'cliente' por seguridad.
   */
  async registerCliente(body: {
    nombre: string;
    email: string;
    password: string;
  }) {
    const { nombre, email, password } = body;

    const existe = await this.usuariosService.buscarPorEmail(email);
    if (existe) throw new BadRequestException('El correo ya está registrado');

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await this.usuariosService.crear({
      nombre,
      email,
      password: passwordHash,
      rol: RolUsuario.CLIENTE,
    });

    return {
      mensaje: 'Cuenta creada exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }

  /**
   * LOGIN GENERAL
   * Incluye el ROL en el payload del JWT para los Guards.
   */
  async login(email: string, password: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Si el usuario tiene una propiedad "activo", es bueno validarla aquí
    if (usuario.activo === false) {
      throw new UnauthorizedException('Esta cuenta está desactivada');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // EL PAYLOAD: Esta es la parte crítica para que funcionen los @Roles
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol, // <--- El RolesGuard leerá esto de aquí
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

  /**
   * REGISTRO ADMINISTRATIVO (INTERNO)
   * Permite crear cualquier tipo de rol.
   */
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
      password: passwordHash,
      rol: rol,
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

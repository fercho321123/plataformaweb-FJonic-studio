import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, RolUsuario } from './entities/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // ✅ MÉTODO ORIGINAL (solo CLIENTE)
  async crearUsuario(dto: CrearUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const usuario = this.usuarioRepository.create({
      nombre: dto.nombre,
      email: dto.email,
      password: passwordHash,
      rol: RolUsuario.CLIENTE, // ✅ siempre cliente
    });

    return this.usuarioRepository.save(usuario);
  }

  // ✅ NUEVO MÉTODO PARA AUTH REGISTER (ADMIN | STAFF | CLIENTE)
  async crear(data: {
    nombre: string;
    email: string;
    password: string;
    rol: RolUsuario;
  }): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const usuario = this.usuarioRepository.create({
      nombre: data.nombre,
      email: data.email,
      password: passwordHash,
      rol: data.rol, // ✅ ahora sí acepta admin, staff o cliente
    });

    return this.usuarioRepository.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }
}

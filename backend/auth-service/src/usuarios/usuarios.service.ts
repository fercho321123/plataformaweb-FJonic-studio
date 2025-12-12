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

  // Registro público (solo CLIENTE)
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
      rol: RolUsuario.CLIENTE,
    });

    return this.usuarioRepository.save(usuario);
  }

  // Registro desde AUTH (admin, staff o cliente)
  async crear(data: {
    nombre: string;
    email: string;
    password: string; // ✔ YA VIENE HASHEADO
    rol: RolUsuario;
  }): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // ❌ YA NO SE HASHÉA AQUÍ
    const usuario = this.usuarioRepository.create({
      nombre: data.nombre,
      email: data.email,
      password: data.password, // ✔ almacenamos el hash directamente
      rol: data.rol,
    });

    return this.usuarioRepository.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }
}


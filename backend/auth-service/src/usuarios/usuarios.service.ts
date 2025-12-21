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

  /**
   * REGISTRO PÚBLICO
   * Crea usuarios con rol 'cliente' por defecto.
   * La contraseña se hashea aquí.
   */
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

  /**
   * CREACIÓN DE STAFF (SOLO ADMIN)
   * Este método lo llama el Admin desde su panel.
   * Fuerza el rol a 'staff' y hashea la clave temporal.
   */
  async crearStaff(dto: CrearUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });

    if (existe) {
      throw new BadRequestException('El correo electrónico ya está en uso por otro empleado o cliente');
    }

    // Hasheamos la contraseña que el Admin le asignó al empleado
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const empleado = this.usuarioRepository.create({
      nombre: dto.nombre,
      email: dto.email,
      password: passwordHash,
      rol: RolUsuario.STAFF,
      activo: true,
    });

    return this.usuarioRepository.save(empleado);
  }

  /**
   * MÉTODO GENÉRICO PARA AUTH
   * Utilizado internamente si la lógica de auth ya trae datos procesados.
   */
  async crear(data: {
    nombre: string;
    email: string;
    password: string; // Se asume que ya viene hasheado de auth-service
    rol: RolUsuario;
  }): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const usuario = this.usuarioRepository.create({
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      rol: data.rol,
    });

    return this.usuarioRepository.save(usuario);
  }

  /**
   * BÚSQUEDA POR EMAIL
   * Utilizado para validaciones de login y perfiles.
   */
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }

  /**
   * OBTENER TODOS LOS USUARIOS (OPCIONAL)
   * Útil para que el admin vea la lista de empleados.
   */
  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      order: { creadoEn: 'DESC' }
    });
  }
}

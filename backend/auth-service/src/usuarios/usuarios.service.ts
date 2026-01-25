import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // 🔐 LOGIN: Ahora sí incluye el password para que tus credenciales funcionen
  async buscarPorEmail(email: string) {
    return await this.usuarioRepo.findOne({ 
      where: { email },
      select: ['id', 'nombre', 'email', 'password', 'rol'] 
    });
  }

  // 👥 NÓMINA: Filtra solo empleados (staff)
  async findAllStaff() {
    return await this.usuarioRepo.find({
      where: { rol: 'staff' }
    });
  }

  // ✅ MÉTODO FALTANTE 1: Crear Staff (Admin)
  async crearStaff(dto: CrearUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const nuevo = this.usuarioRepo.create({
      ...dto,
      password: hashedPassword,
      rol: 'staff'
    });
    return await this.usuarioRepo.save(nuevo);
  }

  // ✅ MÉTODO FALTANTE 2: Crear Usuario (Público)
  async crearUsuario(dto: CrearUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const usuario = this.usuarioRepo.create({
      ...dto,
      password: hashedPassword,
      rol: 'cliente'
    });
    return await this.usuarioRepo.save(usuario);
  }

  // Otros métodos que tenías antes
  async obtenerTodos() {
    return await this.usuarioRepo.find();
  }
}
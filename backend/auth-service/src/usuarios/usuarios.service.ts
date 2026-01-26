import { Injectable, NotFoundException } from '@nestjs/common';
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

  async buscarPorEmail(email: string) {
    return await this.usuarioRepo.findOne({ 
      where: { email },
      select: ['id', 'nombre', 'email', 'password', 'rol'] 
    });
  }

  async findAllStaff() {
    return await this.usuarioRepo.find({
      where: { rol: 'staff' }
    });
  }

  // ✅ CREAR STAFF (Corregido para evitar error 2345)
  async crearStaff(dto: CrearUsuarioDto) {
    const saltRounds = 10; // Definimos el número de rondas
    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    
    const nuevo = this.usuarioRepo.create({
      ...dto,
      password: hashedPassword,
      rol: 'staff'
    });
    return await this.usuarioRepo.save(nuevo);
  }

  // ✅ CREAR USUARIO (Corregido para evitar error 2345)
  async crearUsuario(dto: CrearUsuarioDto) {
    const saltRounds = 10;
    const salt = await bcrypt.getSalt ? await bcrypt.genSalt(saltRounds) : saltRounds;
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    
    const usuario = this.usuarioRepo.create({
      ...dto,
      password: hashedPassword,
      rol: 'cliente'
    });
    return await this.usuarioRepo.save(usuario);
  }

  async obtenerTodos() {
    return await this.usuarioRepo.find();
  }

  // 👇 MÉTODO AGREGADO: ELIMINAR (Para borrar Staff con UUID)
  async eliminar(id: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Empleado no encontrado');
    
    return await this.usuarioRepo.remove(usuario);
  }

  // 👇 MÉTODO AGREGADO: ACTUALIZAR (Para editar el perfil del staff)
  async actualizar(id: string, data: any) {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Empleado no encontrado');

    // Si se cambia la contraseña, hay que hashearla de nuevo
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(usuario, data);
    return await this.usuarioRepo.save(usuario);
  }
}
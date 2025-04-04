import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario, UsuarioDocument } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
  ) {}


  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDocument> {
    const usuario = new this.usuarioModel(createUsuarioDto);
    return usuario.save();
  }

  async findAll() {
    return this.usuarioModel.find().exec()
      .then(usuarios => {
        if (!usuarios || usuarios.length === 0) {
          throw new Error('No se encontraron usuarios');
        }
        return usuarios;
      });
  }

  async findOne(id: string): Promise<UsuarioDocument> {
    return this.usuarioModel.findById(id).exec()
      .then(usuario => {
        if (!usuario) {
          throw new Error(`Usuario con el id ${id} no encontrado`);
        }
        return usuario;
      })
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDocument> {
    return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec()
      .then(usuario => {
        if (!usuario) {
          throw new Error(`Usuario con el id ${id} no encontrado`);
        }
        return usuario;
      });    
  }

  async remove(id: string): Promise<UsuarioDocument> {
    const usuario = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con el id ${id} no encontrado`);
    }
    return usuario;
  }
}

import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all usuarios`;
  }

  async findOne(id: string): Promise<UsuarioDocument> {
    return this.usuarioModel.findById(id).exec()
      .then(usuario => {
        if (!usuario) {
          throw new Error(`Usuario with id ${id} not found`);
        }
        return usuario;
      })
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDocument> {
    return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec()
      .then(usuario => {
        if (!usuario) {
          throw new Error(`Usuario with id ${id} not found`);
        }
        return usuario;
      });    
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

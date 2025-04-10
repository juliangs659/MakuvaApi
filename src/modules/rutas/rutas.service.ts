import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ruta, RutaDocument } from './entities/ruta.entity';
import { Usuario, UsuarioDocument } from '../usuarios/entities/usuario.entity';

@Injectable()
export class RutasService {
  constructor(
    @InjectModel(Ruta.name) private readonly rutaModel: Model<RutaDocument>,
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>
  ) {}

  async create(createRutaDto: CreateRutaDto): Promise<RutaDocument> {
    const nuevaRuta = new this.rutaModel(createRutaDto);
    const rutaCreada = await nuevaRuta.save();

    // Actualizar el usuario que creó la ruta
    const usuario = await this.usuarioModel.findById(createRutaDto.usuarioCreador);
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${createRutaDto.usuarioCreador} no encontrado`);
    }

    usuario.rutasGuardadas.push(rutaCreada._id.toString());
    await usuario.save();

    return rutaCreada;
  }

  async findAll(): Promise<RutaDocument[]> {
    return this.rutaModel.find().exec();
  }

  async findOne(id: string): Promise<RutaDocument> {
    const ruta = await this.rutaModel.findById(id).exec();
    if (!ruta) {
      throw new NotFoundException(`Ruta con el id ${id} no encontrada`);
    }
    return ruta;
  }

  async update(id: string, updateRutaDto: UpdateRutaDto) {
    const ruta = await this.rutaModel.findByIdAndUpdate(
      id,
      updateRutaDto,
      { new: true },
    ).exec();
    if (!ruta) {
      throw new NotFoundException(`Ruta con el id ${id} no encontrada`);
    }
    return ruta;
  }

  async remove(id: string): Promise<RutaDocument> {
    const ruta = await this.rutaModel.findByIdAndDelete(id).exec();
    if (!ruta) {
      throw new NotFoundException(`Ruta con el id ${id} no encontrada`);
    }
    return ruta;

  }
}

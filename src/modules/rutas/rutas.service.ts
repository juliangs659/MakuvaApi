import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ruta, RutaDocument } from './entities/ruta.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Types } from 'mongoose';

@Injectable()
export class RutasService {
  constructor(
    @InjectModel(Ruta.name) private readonly rutaModel: Model<RutaDocument>,
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>
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

  findAll() {
    return `This action returns all rutas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruta`;
  }

  update(id: number, updateRutaDto: UpdateRutaDto) {
    return `This action updates a #${id} ruta`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruta`;
  }
}

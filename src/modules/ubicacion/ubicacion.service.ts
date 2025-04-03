import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { Ubicacion, UbicacionDocument } from './entities/ubicacion.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ruta, RutaDocument } from '../rutas/entities/ruta.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectModel(Ubicacion.name) private readonly ubicacionModel: Model<UbicacionDocument>,
    @InjectModel(Ruta.name) private readonly rutaModel: Model<RutaDocument>,
  ) {}

  async create(createUbicacionDto: CreateUbicacionDto): Promise<UbicacionDocument> {
    const nuevaUbicacion = new this.ubicacionModel(createUbicacionDto);
    const ubicacionCreada = await nuevaUbicacion.save();

    // Actualizar la ruta asociada a la ubicación
    const ruta = await this.rutaModel.findById(createUbicacionDto.ruta);
    if (!ruta) {
      throw new NotFoundException(`Ruta con id ${createUbicacionDto.ruta} no encontrada`);
    }

    ruta.ubicaciones.push(ubicacionCreada._id.toString());
    await ruta.save();

    return ubicacionCreada;

  }

  findAll() {
    return `This action returns all ubicacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ubicacion`;
  }

  update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
    return `This action updates a #${id} ubicacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} ubicacion`;
  }
}

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

  async findAll() {
    return this.ubicacionModel.find().exec()
  }

  async findOne(id: string): Promise<UbicacionDocument> {
    const ubicacion = await this.ubicacionModel.findById(id).exec();
    if (!ubicacion) {
      throw new NotFoundException(`Ubicacion con el id ${id} no encontrada`);
    }
    return ubicacion;
  }

  async update(id: string, updateUbicacionDto: UpdateUbicacionDto): Promise<UbicacionDocument> {
    const ubicacion = await this.ubicacionModel.findByIdAndUpdate(
      id, 
      updateUbicacionDto, 
      { new: true })
      .exec();
    if (!ubicacion) {
      throw new Error(`Ubicacion con el id ${id} no encontrada`);
    }
    return ubicacion;
  }

  async remove(id: string): Promise<UbicacionDocument> {
    return this.ubicacionModel.findByIdAndDelete(id).exec()
      .then(ubicacion => {
        if (!ubicacion) {
          throw new NotFoundException(`Ubicacion con el id ${id} no encontrada`);
        }
        return ubicacion;
      });
    
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePuntoIntereDto } from './dto/create-punto-intere.dto';
import { UpdatePuntoIntereDto } from './dto/update-punto-intere.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PuntoInteres, PuntoInteresDocument } from './entities/punto-interes.entity';
import { Model } from 'mongoose';
import { Ruta, RutaDocument } from '../rutas/entities/ruta.entity';

@Injectable()
export class PuntoInteresService {
  constructor(
    @InjectModel(PuntoInteres.name) private readonly puntoIntereModel: Model<PuntoInteresDocument>,
    @InjectModel(Ruta.name) private readonly rutaModel: Model<RutaDocument>,
  ) {}


  async create(createPuntoIntereDto: CreatePuntoIntereDto): Promise<PuntoInteresDocument> {
    const nuevoPuntoIntere = new this.puntoIntereModel(createPuntoIntereDto);
    const puntoIntereCreado = await nuevoPuntoIntere.save();

    // Actualizar la ruta asociada al punto de interés
    const ruta = await this.rutaModel.findById(createPuntoIntereDto.ruta);
    if (!ruta) {
      throw new NotFoundException(`Ruta con id ${createPuntoIntereDto.ruta} no encontrada`);
    }

    ruta.puntosInteres.push(puntoIntereCreado._id.toString());
    await ruta.save();

    return puntoIntereCreado;
  }

  async findAll() {
    const puntosInteres = await this.puntoIntereModel.find().exec();
    return puntosInteres;
  }

  async findOne(id: string): Promise<PuntoInteresDocument> {
    const puntoIntere = await this.puntoIntereModel.findById(id).exec();
    if (!puntoIntere) {
      throw new NotFoundException(`Punto de interés con el id ${id} no encontrado`);
    }
    return puntoIntere;
  }

  async update(id: string, updatePuntoIntereDto: UpdatePuntoIntereDto): Promise<PuntoInteresDocument> {
    const puntoIntere = await this.puntoIntereModel.findByIdAndUpdate(id, updatePuntoIntereDto, { new: true }).exec();
    if (!puntoIntere) {
      throw new NotFoundException(`Punto de interés con el id ${id} no encontrado`);
    }
    return puntoIntere;
  }

  async remove(id: string): Promise<PuntoInteresDocument> {
    const puntoIntere = await this.puntoIntereModel.findByIdAndDelete(id).exec();
    if (!puntoIntere) {
      throw new NotFoundException(`Punto de interés con el id ${id} no encontrado`);
    }
    return puntoIntere;
  }
}

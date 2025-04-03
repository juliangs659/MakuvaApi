import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePuntoIntereDto } from './dto/create-punto-intere.dto';
import { UpdatePuntoIntereDto } from './dto/update-punto-intere.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PuntoInteres } from './entities/punto-interes.entity';
import { Model } from 'mongoose';
import { Ruta } from '../rutas/entities/ruta.entity';

@Injectable()
export class PuntoInteresService {
  constructor(
    @InjectModel(PuntoInteres.name) private readonly puntoIntereModel: Model<PuntoInteres>,
    @InjectModel(Ruta.name) private readonly rutaModel: Model<Ruta>,
  ) {}


  async create(createPuntoIntereDto: CreatePuntoIntereDto): Promise<PuntoInteres> {
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

  findAll() {
    return `This action returns all puntoInteres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puntoIntere`;
  }

  update(id: number, updatePuntoIntereDto: UpdatePuntoIntereDto) {
    return `This action updates a #${id} puntoIntere`;
  }

  remove(id: number) {
    return `This action removes a #${id} puntoIntere`;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReseniaDto } from './dto/create-resenia.dto';
import { UpdateReseniaDto } from './dto/update-resenia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resenia, ReseniaDocument } from './entities/resenia.entity';
import { Model } from 'mongoose';
import { Ruta, RutaDocument } from '../rutas/entities/ruta.entity';

@Injectable()
export class ReseniaService {
  constructor(
    @InjectModel(Resenia.name) private readonly reseniaModel: Model<ReseniaDocument>,
    @InjectModel(Ruta.name) private readonly rutaModel: Model<RutaDocument>,
  ) {}

  async create(createReseniaDto: CreateReseniaDto): Promise<ReseniaDocument> {
    // verificar si el reseña para ruta o punto de interes
    if (!createReseniaDto.ruta && !createReseniaDto.puntoInteres) {
      throw new BadRequestException('Debe proporcionar una ruta o un punto de interés');
    }
    if (createReseniaDto.ruta && createReseniaDto.puntoInteres) {
      throw new BadRequestException('La reseña no puede estar asociada a una ruta y a un punto de interés al mismo tiempo.');
    }


    const nuevaResenia = new this.reseniaModel(createReseniaDto);
    const reseniaCreada = await nuevaResenia.save();

    // Si la reseña esta asociada a una ruta, actualizar la ruta
    if (createReseniaDto.ruta) {
      const ruta = await this.rutaModel.findById(createReseniaDto.ruta);
      if (!ruta) {
        throw new NotFoundException(`Ruta con id ${createReseniaDto.ruta} no encontrada`);
      }
      ruta.resenias.push(reseniaCreada._id.toString());
      await ruta.save();
    }

    // Si la reseña esta asociada a un punto de interes, actualizar el punto de interes
    if (createReseniaDto.puntoInteres) {
      const puntoInteres = await this.rutaModel.findById(createReseniaDto.puntoInteres);
      if (!puntoInteres) {
        throw new NotFoundException(`Punto de interés con id ${createReseniaDto.puntoInteres} no encontrado`);
      }
      puntoInteres.resenias.push(reseniaCreada._id.toString());
      await puntoInteres.save();
    }
    return reseniaCreada;
  }

  async findAll(): Promise<ReseniaDocument[]> {
    return this.reseniaModel.find().exec();
  }

  async findOne(id: string): Promise<ReseniaDocument> {
    const resenia = await this.reseniaModel.findById(id).exec();
    if (!resenia) {
      throw new NotFoundException(`Resenia con el id ${id} no encontrada`);
    }
    return resenia;
  }

  async findByUserId(userId: string): Promise<ReseniaDocument[]> {
    const resenias = await this.reseniaModel.find({ usuarioCreador: userId }).exec();
    if (!resenias || resenias.length === 0) {
      throw new NotFoundException(`No se encontraron reseñas para el usuario con id ${userId}`);
    }
    return resenias;
  }

  async update(id: string, updateReseniaDto: UpdateReseniaDto): Promise<ReseniaDocument> {
    const resenia = await this.reseniaModel.findByIdAndUpdate(
      id,
      updateReseniaDto,
      { new: true },
    ).exec();
    if (!resenia) {
      throw new NotFoundException(`Resenia con el id ${id} no encontrada`);
    }
    return resenia;

  }

  async remove(id: string): Promise<ReseniaDocument> {
    const resenia = await this.reseniaModel.findByIdAndDelete(id).exec();
    if (!resenia) {
      throw new NotFoundException(`Resenia con el id ${id} no encontrada`);
    }
    return resenia;
  }
}

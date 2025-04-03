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

  findAll() {
    return `This action returns all resenia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resenia`;
  }

  update(id: number, updateReseniaDto: UpdateReseniaDto) {
    return `This action updates a #${id} resenia`;
  }

  remove(id: number) {
    return `This action removes a #${id} resenia`;
  }
}

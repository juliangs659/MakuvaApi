import { Injectable, NotFoundException } from '@nestjs/common';
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
    const nuevaResenia = new this.reseniaModel(createReseniaDto);
    const reseniaCreada = await nuevaResenia.save();

    // Actualizar la ruta asociada a la reseña
    const ruta = await this.rutaModel.findById(createReseniaDto.ruta);
    if (!ruta) {
      throw new NotFoundException(`Ruta con id ${createReseniaDto.ruta} no encontrada`);
    }

    ruta.resenias.push(reseniaCreada._id.toString());
    await ruta.save();

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

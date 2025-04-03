import { Injectable } from '@nestjs/common';
import { CreateMapaDto } from './dto/create-mapa.dto';
import { UpdateMapaDto } from './dto/update-mapa.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mapa, MapaDocument } from './entities/mapa.entity';
import { Model } from 'mongoose';

@Injectable()
export class MapaService {
  constructor(
    @InjectModel(Mapa.name) private readonly mapaModel: Model<MapaDocument>,
  ) {}


  async create(createMapaDto: CreateMapaDto): Promise<MapaDocument> {
    const nuevoMapa = new this.mapaModel(createMapaDto);
    return await nuevoMapa.save();
  }

  findAll() {
    return `This action returns all mapa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapa`;
  }

  update(id: number, updateMapaDto: UpdateMapaDto) {
    return `This action updates a #${id} mapa`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapa`;
  }
}

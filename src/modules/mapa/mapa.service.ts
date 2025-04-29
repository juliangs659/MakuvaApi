import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<MapaDocument[]> {
    const mapas = await this.mapaModel.find().exec();
    return mapas;
  }

  async findOne(id: string): Promise<MapaDocument> {
    const mapa = await this.mapaModel.findById(id).exec();
    if (!mapa) {
      throw new NotFoundException(`Mapa con el id ${id} no encontrado`);
    }
    return mapa;
  }
  

  async update(id: string, updateMapaDto: UpdateMapaDto): Promise<MapaDocument> {
    const mapa = await this.mapaModel.findByIdAndUpdate(
      id, 
      updateMapaDto, 
      { new: true }
    ).exec();
    if (!mapa) {
      throw new NotFoundException(`Mapa con el id ${id} no encontrado`);
    }
    return mapa;
  }

  async remove(id: string): Promise<MapaDocument> {
    const mapa = await this.mapaModel.findByIdAndDelete(id).exec();
    if (!mapa) {
      throw new NotFoundException(`Mapa con el id ${id} no encontrado`);
    }
    return mapa;
  }
}

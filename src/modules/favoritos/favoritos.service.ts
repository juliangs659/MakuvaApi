import { Injectable } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Favorito, FavoritoDocument } from './entities/favorito.entity';
import { Model } from 'mongoose';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectModel(Favorito.name) private readonly favoritoModel: Model<FavoritoDocument>,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto): Promise<FavoritoDocument> {
    const favoritoExistente = await this.favoritoModel.findOne({ 
      usuario: createFavoritoDto.usuario,
      elementoId: createFavoritoDto.elementoId,
      tipo: createFavoritoDto.tipo,
    });

    if (favoritoExistente) {
      throw new Error('El favorito ya existe');
    }
    const nuevoFavorito = new this.favoritoModel(createFavoritoDto);
    return nuevoFavorito.save();
  }

 async findAll(): Promise<FavoritoDocument[]> {
    const favoritos = await this.favoritoModel.find().exec();
    return favoritos;
  }

  async findOne(id: string): Promise<FavoritoDocument> {
    const favorito = await this.favoritoModel.findById(id).exec();
    if (!favorito) {
      throw new Error(`Favorito con el id ${id} no encontrado`);
    }
    return favorito;
  }

  async update(id: string, updateFavoritoDto: UpdateFavoritoDto): Promise<FavoritoDocument> {
    const favorito = await this.favoritoModel.findByIdAndUpdate(
      id,
      updateFavoritoDto,
      { new: true },
    ).exec();
    if (!favorito) {
      throw new Error(`Favorito con el id ${id} no encontrado`);
    }
    return favorito;  
  }

  async remove(id: string): Promise<FavoritoDocument> {
    const favorito = await this.favoritoModel.findByIdAndDelete(id).exec();
    if (!favorito) {
      throw new Error(`Favorito con el id ${id} no encontrado`);
    }
    return favorito;
  }
}

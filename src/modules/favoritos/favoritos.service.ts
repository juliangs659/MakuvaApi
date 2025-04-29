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

  findAll() {
    return `This action returns all favoritos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorito`;
  }

  update(id: number, updateFavoritoDto: UpdateFavoritoDto) {
    return `This action updates a #${id} favorito`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorito`;
  }
}

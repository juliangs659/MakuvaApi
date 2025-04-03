import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { Mongoose } from 'mongoose';
import { Favorito, FavoritoSchema } from './entities/favorito.entity';
import { MongooseModule, Schema } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Favorito.name,
      schema: FavoritoSchema,
    }]),
  ],
  controllers: [FavoritosController],
  providers: [FavoritosService],
})
export class FavoritosModule {}

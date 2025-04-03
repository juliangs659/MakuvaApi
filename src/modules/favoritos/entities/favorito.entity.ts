import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { TipoElementoFavorito } from "../enums/tipo-elemento-favorito";

export type FavoritoDocument = HydratedDocument<Favorito>;

@Schema({ timestamps: true })
export class Favorito {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuario: string

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  elementoId: string;

  @Prop({ type: String, enum: TipoElementoFavorito, required: true })
  tipo: TipoElementoFavorito;


}

export const FavoritoSchema = SchemaFactory.createForClass(Favorito);
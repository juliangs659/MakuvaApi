import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { CategoriaPuntoInteres } from "../enums/categoria-punto-interes";

export type PuntoInteresDocument = HydratedDocument<PuntoInteres>;

@Schema({ timestamps: true })
export class PuntoInteres {

  @Prop({ type: String, required: true, unique: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  ubicacion: string;

  @Prop({ type: String, enum: CategoriaPuntoInteres, required: true })
  categoria: CategoriaPuntoInteres;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop({ type: [String], required: true })
  imagenes: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ruta', required: true })
  ruta: string;
}

export const PuntoInteresSchema = SchemaFactory.createForClass(PuntoInteres);

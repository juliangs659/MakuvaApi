import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type PuntoIntereDocument = HydratedDocument<PuntoIntere>;

@Schema({ timestamps: true })
export class PuntoIntere {

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  ubicacion: string;

  @Prop({ type: String, required: true })
  categoria: string;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop({ type: [String], required: true })
  imagenes: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ruta', required: true })
  ruta: string;
}

export const PuntoIntereSchema = SchemaFactory.createForClass(PuntoIntere);

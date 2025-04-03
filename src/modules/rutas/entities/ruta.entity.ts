import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type RutaDocument = HydratedDocument<Ruta>;

@Schema({ timestamps: true })
export class Ruta {
  @Prop({ required: true })
  origen: string;

  @Prop({ required: true })
  destino: string;

  @Prop({ required: true })
  distanciaTotal: number;

  @Prop({ required: true })
  duracionTotal: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioCreador: string;

  @Prop({ required: true })
  imagen: string;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop({ required: true })
  visitas: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ubicacion' })
  ubicacion: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PuntoInteres' })
  puntosInteres: string;

  @Prop({ required: true })
  tiempoEstimado: number;

  @Prop({ required: true })
  imagenMapa: string;

  @Prop()
  imagenMapa2: string;
}

export const RutaSchema = SchemaFactory.createForClass(Ruta);

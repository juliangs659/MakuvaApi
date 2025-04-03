import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema} from "mongoose";

export type ReseniaDocument = HydratedDocument<Resenia>;
@Schema({ timestamps: true })
export class Resenia {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioCreador: string;

  @Prop()
  puntuacion: number;

  @Prop({ required: true })
  comentario: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ruta', required: true })
  ruta: string;
}

export const ReseniaSchema = SchemaFactory.createForClass(Resenia);
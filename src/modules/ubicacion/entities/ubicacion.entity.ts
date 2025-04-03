import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type UbicacionDocument = HydratedDocument<Ubicacion>;

@Schema({ timestamps: true })
export class Ubicacion {
  @Prop({ required: true })
  latitud: number;

  @Prop({ required: true })
  longitud: number;

  @Prop()
  ciudad: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ruta', required: true })
  ruta: string;
}

export const UbicacionSchema = SchemaFactory.createForClass(Ubicacion);
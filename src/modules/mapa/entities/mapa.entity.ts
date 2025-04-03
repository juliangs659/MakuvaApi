import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type MapaDocument = HydratedDocument<Mapa>;

@Schema({ timestamps: true })
export class Mapa {

  @Prop({require: false})
  nombre: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref:'Ruta', required: true }) 
  ruta: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref:'PuntoInteres' }] })
  puntosInteres: string[];

  @Prop({ required: false })
  imagenMapa: string;

  @Prop({ type: Object, required: false })
  configuracion: {
    zoom: number;
    centro: { latitud: number; longitud: number };
  }

}

export const MapaSchema = SchemaFactory.createForClass(Mapa);

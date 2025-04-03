import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema} from "mongoose";

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Ruta' }] })
  rutasGuardadas: string[];

  @Prop()
  historialBusqueda: string;

  @Prop({ required: true })
  genero: string;

  @Prop({ required: true })
  rol: string;

  @Prop()
  imagen: string;

  @Prop({ required: true })
  ciudad: string;

  @Prop()
  preferencias: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

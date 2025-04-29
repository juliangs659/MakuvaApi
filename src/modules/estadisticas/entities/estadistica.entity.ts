import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EstadisticaDocument = HydratedDocument<Estadistica>;

@Schema({ timestamps: true })
export class Estadistica {
  @Prop({ required: true })
  tipo: string; // Tipo de estadística (usuarios, rutas, reportes, etc.)

  @Prop({ required: true })
  descripcion: string; // Descripción breve de la estadística

  @Prop({ required: true })
  valor: number; // Valor numérico de la estadística

  @Prop({ required: true })
  fecha: Date; // Fecha en la que se registró la estadística

  @Prop({ type: Object })
  detalles?: Record<string, any>; // Detalles adicionales en formato JSON (opcional)
}

export const EstadisticaSchema = SchemaFactory.createForClass(Estadistica);
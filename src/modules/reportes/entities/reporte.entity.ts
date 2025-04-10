import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TipoReporte } from "../enums/tipo-reporte";

export type ReporteDocument = HydratedDocument<Reporte>;

@Schema({ timestamps: true })
export class Reporte {
  @Prop({ type: String, required: true, maxlength: 100 })
  titulo: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, enum: TipoReporte, required: true })
  tipo: TipoReporte

  @Prop({ type: String, required: true })
  usuarioId: string;

  @Prop({ type: String, required: false })
  url?: string;

  @Prop({ type: String, required: false })
  navegador?: string;

  @Prop({ type: String, required: false })
  sistemaOperativo?: string;

  @Prop({ type: String, required: false })
  capturaPantalla?: string;

}

export const ReporteSchema = SchemaFactory.createForClass(Reporte);
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsObject } from 'class-validator';

export class CreateEstadisticaDto {
  @IsString()
  @IsNotEmpty()
  tipo: string; // Tipo de estadística (usuarios, rutas, reportes, etc.)

  @IsString()
  @IsNotEmpty()
  descripcion: string; // Descripción breve de la estadística

  @IsNumber()
  @IsNotEmpty()
  valor: number; // Valor numérico de la estadística

  @IsDate()
  @IsNotEmpty()
  fecha: Date; // Fecha en la que se registró la estadística

  @IsObject()
  @IsOptional()
  detalles?: Record<string, any>; // Detalles adicionales en formato JSON (opcional)
}

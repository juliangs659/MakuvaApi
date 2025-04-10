import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsEnum } from 'class-validator';
import { TipoReporte } from '../enums/tipo-reporte';

export class CreateReporteDto {
  @IsString()
  @IsNotEmpty()
  titulo: string; // Breve título o resumen del problema

  @IsString()
  @IsNotEmpty()
  descripcion: string; // Descripción detallada del problema o sugerencia

  @IsEnum(TipoReporte)
  @IsNotEmpty()
  tipo: TipoReporte; // Tipo de reporte: bug, sugerencia, otro

  @IsMongoId()
  @IsOptional()
  usuarioId: string; // ID del usuario que reporta el problema

  @IsString()
  @IsOptional()
  url?: string; // URL de la página donde ocurrió el problema (si aplica)

  @IsString()
  @IsOptional()
  navegador?: string; // Información sobre el navegador del usuario

  @IsString()
  @IsOptional()
  sistemaOperativo?: string; // Información sobre el sistema operativo del usuario

  @IsString()
  @IsOptional()
  capturaPantalla?: string; // URL o base64 de una captura de pantalla del problema (opcional)
}
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateRutaDto {
  @IsString()
  @IsNotEmpty()
  origen: string;

  @IsString()
  @IsNotEmpty()
  destino: string;

  @IsNumber()
  @IsNotEmpty()
  distanciaTotal: number;

  @IsNumber()
  @IsNotEmpty()
  duracionTotal: number;

  @IsMongoId()
  @IsNotEmpty()
  usuarioCreador: string;

  @IsMongoId()
  @IsNotEmpty()
  resenia: string;

  @IsString()
  @IsNotEmpty()
  imagen: string;

  @IsNumber()
  @IsNotEmpty()
  likes: number;

  @IsNumber()
  @IsNotEmpty()
  dislikes: number;

  @IsNumber()
  @IsNotEmpty()
  visitas: number;

  @IsMongoId()
  @IsOptional()
  ubicacion?: string;

  @IsMongoId()
  @IsOptional()
  puntosInteres?: string;

  @IsNumber()
  @IsNotEmpty()
  tiempoEstimado: number;

  @IsString()
  @IsNotEmpty()
  imagenMapa: string;

  @IsString()
  @IsNotEmpty()
  imagenMapa2: string;
}

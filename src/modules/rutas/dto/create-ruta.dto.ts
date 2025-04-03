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

  @IsMongoId({ each: true }) // Valida que cada elemento sea un ID válido de MongoDB
  @IsOptional()
  resenias?: string[];
  
  @IsMongoId({ each: true }) 
  @IsOptional()
  puntosInteres?: string[];

  @IsMongoId({ each: true }) 
  @IsOptional()
  ubicaciones?: string[];
  
  @IsString()
  @IsNotEmpty()
  imagen: string;

  @IsNumber()
  @IsOptional()
  likes?: number;

  @IsNumber()
  @IsOptional()
  dislikes?: number;

  @IsNumber()
  @IsOptional()
  visitas?: number;



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

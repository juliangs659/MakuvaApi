import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateMapaDto {

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsMongoId()
  @IsNotEmpty()
  ruta: string;

  @IsMongoId({ each: true })
  @IsOptional()
  puntosInteres?: string[];

  @IsString()
  @IsOptional()
  imagenMapa?: string;

  @ValidateNested()
  @Type( () => Object )
  @IsOptional()
  configuracion?: {
    zoom: number;
    centro: { latitud: number; longitud: number };
  };
}

import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CategoriaPuntoInteres } from "../enums/categoria-punto-interes";

export class CreatePuntoIntereDto {
  
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsString()
  @IsNotEmpty()
  descripcion: string;
  
  @IsMongoId()
  @IsNotEmpty()
  ubicacion: string;
  
  @IsEnum(CategoriaPuntoInteres)
  @IsNotEmpty()
  categoria: CategoriaPuntoInteres;
  
  @IsNumber()
  @IsNotEmpty()
  likes: number;
  
  @IsNumber()
  @IsNotEmpty()
  dislikes: number;
  
  @IsString({ each: true })
  @IsNotEmpty()
  imagenes: string[];

  @IsMongoId()
  @IsNotEmpty()
  ruta: string;
}

import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CategoriaPuntoInteres } from "../enums/categoria-punto-interes";

export class CreatePuntoIntereDto {
  
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsString()
  @IsNotEmpty()
  descripcion: string;
  
<<<<<<< HEAD

  @IsString()
=======
  @IsMongoId()
>>>>>>> bce0b63d95b0d8b329167c92618177b4b2367491
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

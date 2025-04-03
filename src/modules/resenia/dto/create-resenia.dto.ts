import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReseniaDto {
  @IsMongoId()
  @IsNotEmpty()
  usuarioCreador: string;

  @IsNumber()
  @IsNotEmpty()
  puntuacion: number;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsMongoId()
  @IsOptional()
  ruta?: string;

  @IsMongoId()
  @IsOptional()
  puntoInteres?: string;
}

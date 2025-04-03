import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  @IsNotEmpty()
  ruta: string;
}

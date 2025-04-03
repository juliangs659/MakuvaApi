import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { TipoElementoFavorito } from "../enums/tipo-elemento-favorito";

export class CreateFavoritoDto {
  @IsMongoId()
  @IsNotEmpty()
  usuario: string;

  @IsMongoId()
  @IsNotEmpty()
  elementoId: string;

  @IsEnum(TipoElementoFavorito)
  @IsNotEmpty()
  tipo: TipoElementoFavorito;
}

import { IsString, IsEmail, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsMongoId({ each: true }) // Valida que cada elemento sea un ID válido de MongoDB
  rutasGuardadas?: string[];

  @IsOptional()
  @IsString()
  historialBusqueda?: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  rol: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsOptional()
  @IsString()
  preferencias?: string;
}
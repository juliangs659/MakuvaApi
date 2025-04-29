import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  async create(@Body() createFavoritoDto: CreateFavoritoDto) {
    const favorito = await this.favoritosService.create(createFavoritoDto);
    return {
      message: 'Favorito creado correctamente',
      favorito,
    };
  }

  @Get()
  async findAll() {
    const favoritos = await this.favoritosService.findAll();
    return {
      message: 'Favoritos encontrado',
      favoritos,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const favorito = await this.favoritosService.findOne(id);
    if (!favorito) {
      return {
        message: 'Favorito no encontrado',
      };
    }
    return {
      message: 'Favorito encontrado',
      favorito,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string, 
    @Body() updateFavoritoDto: UpdateFavoritoDto) {
    const favorito = await this.favoritosService.update(id, updateFavoritoDto);
    if (!favorito) {
      return {
        message: 'Favorito no encontrado',
      };
    }
    return {
      message: 'Favorito actualizado correctamente',
      favorito,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const favorito = await this.favoritosService.remove(id);
    if (!favorito) {
      return {
        message: 'Favorito no encontrado',
      };
    }
    return {
      message: 'Favorito eliminado correctamente',
      favorito,
    };
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapaService } from './mapa.service';
import { CreateMapaDto } from './dto/create-mapa.dto';
import { UpdateMapaDto } from './dto/update-mapa.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('mapa')
export class MapaController {
  constructor(private readonly mapaService: MapaService) {}

  @Post()
  async create(@Body() createMapaDto: CreateMapaDto) {
    const mapa = await this.mapaService.create(createMapaDto);
    return {
      message: 'Mapa created successfully',
      mapa,
    };
  }

  @Get()
  async findAll() {
    const mapas = await this.mapaService.findAll();
    return {
      message: 'Mapas found',
      mapas,
    };

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const mapa = await this.mapaService.findOne(id);
    if (!mapa) {
      return {
        message: 'Mapa no encontrado',
      };
    }
    return {
      message: 'Mapa encontrado',
      mapa,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string, 
    @Body() updateMapaDto: UpdateMapaDto) 
    {
    const mapa = await this.mapaService.update(id, updateMapaDto);
    if (!mapa) {
      return {
        message: 'Mapa no encontrado',
      };
    }
    return {
      message: 'Mapa actualizado correctamente',
      mapa,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const mapa = await this.mapaService.remove(id);
    if (!mapa) {
      return {
        message: 'Mapa no encontrado',
      };
    }
    return {
      message: 'Mapa eliminado correctamente',
      mapa,
    };
  }
}

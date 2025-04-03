import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapaService } from './mapa.service';
import { CreateMapaDto } from './dto/create-mapa.dto';
import { UpdateMapaDto } from './dto/update-mapa.dto';

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
  findAll() {
    return this.mapaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapaDto: UpdateMapaDto) {
    return this.mapaService.update(+id, updateMapaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapaService.remove(+id);
  }
}

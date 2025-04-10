import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  async create(@Body() createRutaDto: CreateRutaDto) {
    const ruta = await this.rutasService.create(createRutaDto);
    return {
      message: 'Ruta created successfully',
      ruta,
    };
  }

  @Get()
  async findAll() {
    const rutas = await this.rutasService.findAll();
    return {
      message: 'Rutas encontradas',
      rutas,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const ruta = await this.rutasService.findOne(id);
    return {
      message: 'Ruta encontrada',
      ruta,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateRutaDto: UpdateRutaDto
  ) {
      const ruta = await this.rutasService.update(id, updateRutaDto);
      return {
        message: 'Ruta actualizada correctamente',
        ruta,
      };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const ruta = await this.rutasService.remove(id);
    return {
      message: 'Ruta eliminada correctamente',
      ruta,
    };
  }
}

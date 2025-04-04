import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Post()
  async create(@Body() createUbicacionDto: CreateUbicacionDto) {
    const ubicacion = await this.ubicacionService.create(createUbicacionDto);
    return {
      message: 'Ubicacion creada correctamente',
      ubicacion,
    };
  }

  @Get()
  async findAll() {
    const ubicaciones = await this.ubicacionService.findAll();
    return {
      message: 'Ubicaciones Encontradas',
      ubicaciones,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const ubicacion = await this.ubicacionService.findOne(id);
    return {
      message: 'Ubicacion encontrada',
      ubicacion,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string, 
    @Body() updateUbicacionDto: UpdateUbicacionDto) 
    {
      const ubicacion = await this.ubicacionService.update(id, updateUbicacionDto);
      return {
        message: 'Ubicacion actualizada correctamente',
        ubicacion,
      };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const ubicacion = await this.ubicacionService.remove(id);
    return {
      message: 'Ubicacion eliminada correctamente',
      ubicacion,
    };
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntoInteresService } from './punto-interes.service';
import { CreatePuntoIntereDto } from './dto/create-punto-intere.dto';
import { UpdatePuntoIntereDto } from './dto/update-punto-intere.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('punto-interes')
export class PuntoInteresController {
  constructor(private readonly puntoInteresService: PuntoInteresService) {}

  @Post()
  async create(@Body() createPuntoIntereDto: CreatePuntoIntereDto) {
    const puntoInteres = await this.puntoInteresService.create(createPuntoIntereDto);
    return {
      message: 'Punto de Interes created successfully',
      puntoInteres,
    };  
  }

  @Get()
  findAll() {
    return this.puntoInteresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const puntoInteres = await this.puntoInteresService.findOne(id);
    return {
      message: 'Punto de interes encontrado',
      puntoInteres
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updatePuntoIntereDto: UpdatePuntoIntereDto
  ) {
    const puntosInteres = await this.puntoInteresService.update(id, updatePuntoIntereDto);
    return {
      message: 'Punto de Interes actualizado',
      puntosInteres
    }
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const puntoInteres = await this.puntoInteresService.remove(id);
    return {
      message: "Punto de Interes eliminado con exito",
      puntoInteres
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntoInteresService } from './punto-interes.service';
import { CreatePuntoIntereDto } from './dto/create-punto-intere.dto';
import { UpdatePuntoIntereDto } from './dto/update-punto-intere.dto';

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
  findOne(@Param('id') id: string) {
    return this.puntoInteresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntoIntereDto: UpdatePuntoIntereDto) {
    return this.puntoInteresService.update(+id, updatePuntoIntereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntoInteresService.remove(+id);
  }
}

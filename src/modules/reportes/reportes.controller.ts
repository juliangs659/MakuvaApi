import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  async create(@Body() createReporteDto: CreateReporteDto) {
    const reporte = await this.reportesService.create(createReporteDto);
    return {
      message: 'Reporte creado correctamente',
      reporte,
    };
  }

  @Get()
  async findAll() {
    const reportes = await this.reportesService.findAll();
    return {
      message: 'Reportes encontrados',
      reportes,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const reporte = await this.reportesService.findOne(id);
    if (!reporte) {
      return {
        message: 'Reporte no encontrado',
      };
    }
    return {
      message: 'Reporte encontrado',
      reporte,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string, 
    @Body() updateReporteDto: UpdateReporteDto
  ) {
    const reporte = await this.reportesService.update(id, updateReporteDto);
    if (!reporte) {
      return {
        message: 'Reporte no encontrado',
      };
    }
    return {
      message: 'Reporte actualizado correctamente',
      reporte,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const reporte = await this.reportesService.remove(id);
    if (!reporte) {
      return {
        message: 'Reporte no encontrado',
      };
    }
    return {
      message: 'Reporte eliminado correctamente',
      reporte,
    };
  }
}

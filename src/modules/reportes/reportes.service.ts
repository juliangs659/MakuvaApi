import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reporte, ReporteDocument } from './entities/reporte.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReportesService {
 
  constructor(
    @InjectModel(Reporte.name) private readonly reporteModel: Model<ReporteDocument>,
  ) {}
  
  
  async create(createReporteDto: CreateReporteDto): Promise<ReporteDocument> {
    const nuevoReporte = await this.reporteModel.create(createReporteDto);
    return nuevoReporte
  }

  async findAll() {
    const reportes = await this.reporteModel.find().exec();
    return reportes;
  }

  async findOne(id: string): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.findById(id).exec();
    if (!reporte) {
      throw new Error(`Reporte con el id ${id} no encontrado`);
    }
    return reporte;
  }

  async update(id: string, updateReporteDto: UpdateReporteDto): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.findByIdAndUpdate(
      id,
      updateReporteDto,
      { new: true },
    ).exec();
    if (!reporte) {
      throw new Error(`Reporte con el id ${id} no encontrado`);
    }
    return reporte;
  }

  async remove(id: string): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.findByIdAndDelete(id).exec();
    if (!reporte) {
      throw new Error(`Reporte con el id ${id} no encontrado`);
    }
    return reporte;
  }
}

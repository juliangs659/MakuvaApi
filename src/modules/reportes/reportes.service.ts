import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reporte, ReporteDocument } from './entities/reporte.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReportesService {
<<<<<<< HEAD
  constructor(
    @InjectModel(Reporte.name) private readonly reporteModel: Model<ReporteDocument>
  ) {}


  async create(createReporteDto: CreateReporteDto): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.create(createReporteDto);
    return reporte.save();
  }

  async findAll(): Promise<ReporteDocument[]> {
=======
 
  constructor(
    @InjectModel(Reporte.name) private readonly reporteModel: Model<ReporteDocument>,
  ) {}
  
  
  async create(createReporteDto: CreateReporteDto): Promise<ReporteDocument> {
    const nuevoReporte = await this.reporteModel.create(createReporteDto);
    return nuevoReporte
  }

  async findAll() {
>>>>>>> bce0b63d95b0d8b329167c92618177b4b2367491
    const reportes = await this.reporteModel.find().exec();
    return reportes;
  }

  async findOne(id: string): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.findById(id).exec();
    if (!reporte) {
<<<<<<< HEAD
      throw new NotFoundException(`Reporte con el id ${id} no encontrado`);
=======
      throw new Error(`Reporte con el id ${id} no encontrado`);
>>>>>>> bce0b63d95b0d8b329167c92618177b4b2367491
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
<<<<<<< HEAD
      throw new NotFoundException(`Reporte con el id ${id} no encontrado`);
=======
      throw new Error(`Reporte con el id ${id} no encontrado`);
>>>>>>> bce0b63d95b0d8b329167c92618177b4b2367491
    }
    return reporte;
  }

<<<<<<< HEAD
 async remove(id: string): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.findByIdAndDelete(id).exec();
    if (!reporte) {
      throw new NotFoundException(`Reporte con el id ${id} no encontrado`);
=======
  async remove(id: string): Promise<ReporteDocument> {
    const reporte = await this.reporteModel.findByIdAndDelete(id).exec();
    if (!reporte) {
      throw new Error(`Reporte con el id ${id} no encontrado`);
>>>>>>> bce0b63d95b0d8b329167c92618177b4b2367491
    }
    return reporte;
  }
}

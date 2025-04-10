import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reporte, ReporteSchema } from './entities/reporte.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Reporte.name,
      schema: ReporteSchema,
    }]),


  ],
  controllers: [ReportesController],
  providers: [ReportesService],
  exports: [MongooseModule],
})
export class ReportesModule {}

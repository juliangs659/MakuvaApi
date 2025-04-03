import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ubicacion, UbicacionSchema } from './entities/ubicacion.entity';
import { RutasModule } from '../rutas/rutas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Ubicacion.name,
      schema: UbicacionSchema,
    }]),
    RutasModule,
  ],
  controllers: [UbicacionController],
  providers: [UbicacionService],
  exports: [MongooseModule],
})
export class UbicacionModule {}

import { Module } from '@nestjs/common';
import { PuntoInteresService } from './punto-interes.service';
import { PuntoInteresController } from './punto-interes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PuntoInteres, PuntoInteresSchema } from './entities/punto-interes.entity';
import { RutasModule } from '../rutas/rutas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: PuntoInteres.name,
      schema: PuntoInteresSchema,
    }]),
    RutasModule,
  ],
  controllers: [PuntoInteresController],
  providers: [PuntoInteresService],
  exports: [MongooseModule],
})
export class PuntoInteresModule {}

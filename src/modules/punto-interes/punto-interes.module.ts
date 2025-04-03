import { Module } from '@nestjs/common';
import { PuntoInteresService } from './punto-interes.service';
import { PuntoInteresController } from './punto-interes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PuntoIntere, PuntoIntereSchema } from './entities/punto-intere.entity';
import { RutasModule } from '../rutas/rutas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: PuntoIntere.name,
      schema: PuntoIntereSchema,
    }]),
    RutasModule,
  ],
  controllers: [PuntoInteresController],
  providers: [PuntoInteresService],
  exports: [MongooseModule],
})
export class PuntoInteresModule {}

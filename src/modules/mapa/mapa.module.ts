import { Module } from '@nestjs/common';
import { MapaService } from './mapa.service';
import { MapaController } from './mapa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mapa, MapaSchema } from './entities/mapa.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Mapa.name,
      schema: MapaSchema,
    }]),
  ],
  controllers: [MapaController],
  providers: [MapaService],
})
export class MapaModule {}

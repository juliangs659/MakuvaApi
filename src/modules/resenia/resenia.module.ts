import { Module, Res } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { ReseniaController } from './resenia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resenia, ReseniaSchema } from './entities/resenia.entity';
import { RutasModule } from '../rutas/rutas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Resenia.name,
      schema: ReseniaSchema
    }]),
    RutasModule,
  ],
  controllers: [ReseniaController],
  providers: [ReseniaService],
  exports: [MongooseModule],
})
export class ReseniaModule {}

import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Estadistica, EstadisticaSchema } from './entities/estadistica.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RutasModule } from '../rutas/rutas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Estadistica.name,
      schema: EstadisticaSchema,
    }]),
    UsuariosModule,
    RutasModule,
  ],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}

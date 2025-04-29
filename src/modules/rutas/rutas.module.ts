import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ruta, RutaSchema } from './entities/ruta.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Ruta.name,
      schema: RutaSchema
    }]),
    UsuariosModule,
  ],
  controllers: [RutasController],
  providers: [RutasService],
  exports: [MongooseModule, RutasService], // Exporta el módulo y el servicio para que puedan ser utilizados en otros módulos
})
export class RutasModule {}

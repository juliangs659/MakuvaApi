import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { RutasModule } from './modules/rutas/rutas.module';
import { ReseniaModule } from './modules/resenia/resenia.module';
import { PuntoInteresModule } from './modules/punto-interes/punto-interes.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';

const DB_NAME = process.env.APIDB_DB;
const URL_MONGO = process.env.MONGODB_BD as string + DB_NAME; 

@Module({
  imports: [
    MongooseModule.forRoot(URL_MONGO),
    UsuariosModule,
    RutasModule,
    ReseniaModule,
    PuntoInteresModule,
    UbicacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { RutasModule } from './modules/rutas/rutas.module';
import { ReseniaModule } from './modules/resenia/resenia.module';
import { PuntoInteresModule } from './modules/punto-interes/punto-interes.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';
import { MapaModule } from './modules/mapa/mapa.module';
import { FavoritosModule } from './modules/favoritos/favoritos.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { Estadistica } from './modules/estadisticas/entities/estadistica.entity';
import { EstadisticasModule } from './modules/estadisticas/estadisticas.module';

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
    MapaModule,
    FavoritosModule,
    ReportesModule,
    MapaModule,
    FavoritosModule,
    EstadisticasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

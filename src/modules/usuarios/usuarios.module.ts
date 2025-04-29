import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Usuario.name, // Referencia al nombre de la clase
      schema: UsuarioSchema, // Referencia al esquema exportado
    }]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [MongooseModule, UsuariosService], // Exporta el módulo y el servicio para que puedan ser utilizados en otros módulos
})
export class UsuariosModule {}

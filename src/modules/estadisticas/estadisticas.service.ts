import { Injectable } from '@nestjs/common';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RutasService } from '../rutas/rutas.service';

@Injectable()
export class EstadisticasService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rutasService: RutasService,
  ) {}
  create(createEstadisticaDto: CreateEstadisticaDto) {
    return 'This action adds a new estadistica';
  }

  async obtenerEstadisticas() {
    const totalUsuarios = await this.usuariosService.contarUsuarios();
    const totalRutas = await this.rutasService.contarRutas();

    return {
      usuarios: {
        total: totalUsuarios,
        descripcion: 'Total de usuarios registrados',
      },
      rutas: {
        total: totalRutas,
        descripcion: 'Total de rutas registradas',
      },
    };
  }


  findAll() {
    return `This action returns all estadisticas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadistica`;
  }

  update(id: number, updateEstadisticaDto: UpdateEstadisticaDto) {
    return `This action updates a #${id} estadistica`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadistica`;
  }
}

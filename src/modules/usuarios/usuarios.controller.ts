import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuariosService.create(createUsuarioDto);
    return {
      message: 'Usuario creado correctamente',
      usuario,
    };
  }

  @Get()
  async findAll() {
    const usuarios = await this.usuariosService.findAll();
    return {
      message: 'Usuarios encontrados',
      usuarios,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const usuario = await this.usuariosService.findOne(id);
    return {
      message: 'Usuario encontrado',
      usuario,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string, 
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
      const usuario = await this.usuariosService.update(id, updateUsuarioDto);
      return {
        message: 'Usuario actualizado correctamente',
        usuario,
      };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const usuario = await this.usuariosService.remove(id);
    return {
      message: 'Usuario eliminado correctamente',
      usuario,
    };
  } 
}

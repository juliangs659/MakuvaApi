import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { CreateReseniaDto } from './dto/create-resenia.dto';
import { UpdateReseniaDto } from './dto/update-resenia.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validar-object-id.pipe';

@Controller('resenia')
export class ReseniaController {
  constructor(private readonly reseniaService: ReseniaService) {}

  @Post()
  async create(@Body() createReseniaDto: CreateReseniaDto) {
    const resenia = await this.reseniaService.create(createReseniaDto);
    return {
      message: 'Resenia creada correctamente',
      resenia,
    };
  }

  @Get()
  async findAll() {
    const resenias = await this.reseniaService.findAll();
    return {
      message: 'Resenias encontradas',
      resenias,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    const resenia = await this.reseniaService.findOne(id);
    return {
      message: 'Resenia encontrada',
      resenia,
    };
  }
  
  // get resenias by user id
  @Get('user/:userId')
  async findByUserId(@Param('userId', ValidateObjectIdPipe) userId: string) {
    const resenias = await this.reseniaService.findByUserId(userId);
    return {
      message: 'Resenias encontradas',
      resenias,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string, 
    @Body() updateReseniaDto: UpdateReseniaDto
  ) {
      const resenia = await this.reseniaService.update(id, updateReseniaDto);
      return {
        message: 'Resenia actualizada correctamente',
        resenia,
      };
    }

  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    const resenia = this.reseniaService.remove(id);
    return {
      message: 'Resenia eliminada correctamente',
      resenia,
    };
  }
}

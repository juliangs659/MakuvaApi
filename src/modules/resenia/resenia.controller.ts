import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { CreateReseniaDto } from './dto/create-resenia.dto';
import { UpdateReseniaDto } from './dto/update-resenia.dto';

@Controller('resenia')
export class ReseniaController {
  constructor(private readonly reseniaService: ReseniaService) {}

  @Post()
  async create(@Body() createReseniaDto: CreateReseniaDto) {
    const resenia = await this.reseniaService.create(createReseniaDto);
    return {
      message: 'Resenia created successfully',
      resenia,
    };
  }

  @Get()
  findAll() {
    return this.reseniaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reseniaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReseniaDto: UpdateReseniaDto) {
    return this.reseniaService.update(+id, updateReseniaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reseniaService.remove(+id);
  }
}

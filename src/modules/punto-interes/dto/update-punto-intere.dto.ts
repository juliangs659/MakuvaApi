import { PartialType } from '@nestjs/mapped-types';
import { CreatePuntoIntereDto } from './create-punto-intere.dto';

export class UpdatePuntoIntereDto extends PartialType(CreatePuntoIntereDto) {}

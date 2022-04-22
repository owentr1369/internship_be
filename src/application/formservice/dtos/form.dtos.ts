import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDocumentDto } from '../../../domain/dtos';
import { IsString } from 'class-validator';
export class FormDto extends BaseDocumentDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  name: string;
  @AutoMap()
  @ApiProperty()
  @IsString()
  email: string;
  @AutoMap()
  @ApiProperty()
  @IsString()
  phone: string;
  @AutoMap()
  @ApiProperty()
  @IsString()
  notes: string;
}
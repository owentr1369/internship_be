import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { FormDto } from '../dtos';
import { Form } from '../../../domain/schemas';

@Injectable()
export class FormMapper extends AutomapperProfile {
  constructor(@InjectMapper('') mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(Form, FormDto);
    };
  }
}
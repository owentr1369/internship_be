import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import {Form, FormSchema} from '../../domain/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { FormController } from './form.controller';

@Module({
  controllers: [FormController],
  imports: [
    MongooseModule.forFeature([{
      name: Form.name, schema: FormSchema
    }]),
  ],
  providers:[FormService]
})
export class FormModule {}
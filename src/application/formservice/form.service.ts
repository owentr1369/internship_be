import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { appConfig } from 'src/config/configuration';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { FormDto } from './dtos';
import {Form, FormDocument} from '../../domain/schemas';

@Injectable()
export class FormService{
    @InjectModel(Form.name) private readonly formModel: Model<FormDocument>;
    async saveUserSubmit(payload: FormDto): Promise<any>{
        const newForm = new this.formModel({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            notes: payload.notes,
        });
        await newForm.save();
        return newForm;
    }
}
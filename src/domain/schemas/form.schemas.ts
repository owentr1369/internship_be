import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AutoMap } from '@automapper/classes';

export type FormDocument = Form & Document;

@Schema({
  collection: 'form',
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Form {
  @AutoMap()
  @Prop()
  name: string;
  @AutoMap()
  @Prop()
  email: string;
  @AutoMap()
  @Prop()
  phone: string;
  @AutoMap()
  @Prop()
  notes: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
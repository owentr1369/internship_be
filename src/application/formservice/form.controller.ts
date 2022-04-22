import { CommandBus } from '@nestjs/cqrs';
import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Next,
  Request,
  Get,
  UseGuards,
  Inject,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BaseResult } from '../../domain/dtos';
import { FormDto } from './dtos';
import { BadRequestException } from '@nestjs/common';
import { Type } from 'class-transformer';
import {FormService} from './form.service';
import { stringify } from 'querystring';

@ApiTags('Form')
@Controller('form')
export class FormController {
  private readonly logger = new Logger(FormController.name);
  constructor(private readonly formService: FormService){}
  @Post ('submit')
  async sumitForm(
      @Body() body: FormDto,
      @Res() res,
      @Next() next
  ): Promise<BaseResult<any>>{
      try{
          const result = new BaseResult<any>();
          const data = await this.formService.saveUserSubmit(body);
          const {name, email, phone, notes} = data;
          result.data = {
              name,
              email,
              phone,
              notes
          }
          result.success = true;
          return res.status(HttpStatus.OK).json(result);
      }
      catch (err){
          next(err)
      }
  }
}
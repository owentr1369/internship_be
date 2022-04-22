import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'process';
import { AppModule } from './app.module';
import { appConfig } from './config/configuration';
import { HttpExceptionFilter } from './filter/exception.filter';
import { ConfigService } from '@nestjs/config';

const globalPrefix = '/api';
const applicationConfig = appConfig();
function configureSwagger(app: INestApplication) {
  const baseApi = '/' + applicationConfig.baseUrl + globalPrefix;
  const baseUrl = baseApi.replace('//', '/');
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('form-service')
    .setDescription('The form-service API description')
    .setVersion('1.0.0')
    .addServer(baseUrl)
    .setBasePath(baseUrl)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, swaggerDoc);
}

function configureValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  configureSwagger(app);
  configureValidation(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const server = await app.listen(applicationConfig.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  server.setTimeout(1800000);
}
bootstrap();
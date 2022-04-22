import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { FormModule } from './application/formservice/form.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          autoIndex: true,
          uri: configService.get<string>('app.mongodb.uri'),
        };
      },
      inject: [ConfigService],
    }),

    AutomapperModule.forRoot({
      options: [{ name: '', pluginInitializer: classes }],
      singular: true,
    }),
    FormModule
  ],
})
export class AppModule {}
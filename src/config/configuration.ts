import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
export const appConfig = registerAs(
  'app',
  () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    baseUrl: process.env.BASE_URL_APIS || '',
    mongodb: {
      uri: process.env.MONGODB_URI,
    }
  }),
);
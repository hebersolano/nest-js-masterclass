import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setVersion('1.0')
  .setTitle('NestJS Masterclass - API')
  .setDescription('User the base API URL at http://localhost:3000')
  .setTermsOfService('http://localhost:3000/term-of-service')
  .setLicense('MIT', 'http://localhost:3000/mit')
  .addServer('http://localhost:3000')
  .build();

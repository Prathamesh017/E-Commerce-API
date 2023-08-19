import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
  .setTitle('ECommerce App ')
  .setDescription('The Order API description')
  .setVersion('1.0')
  .addTag('order')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',//add name in API BEARER TOKEN 
  )
  .build();
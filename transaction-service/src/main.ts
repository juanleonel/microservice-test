import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransactionModule } from './transaction/transaction.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(TransactionModule);
  // new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Transaction API') // title of the API
    .setDescription('Transaction API description')
    // description of the API
    .setVersion('1.0') // version of the API
    .build(); // Build the document
  // Create a Swagger document
  const document = SwaggerModule.createDocument(app, config);
  // Setup Swagger module
  SwaggerModule.setup('api', app, document);
  // Start the application and listen for requests on port 3000
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Weather Proxy API')
    .setDescription('A proxy service that fetches weather data from OpenWeatherMap API')
    .setVersion('1.0')
    .addTag('weather')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Weather Proxy API running on http://localhost:3000');
  console.log('📚 Swagger docs available at http://localhost:3000/api');
}
bootstrap();
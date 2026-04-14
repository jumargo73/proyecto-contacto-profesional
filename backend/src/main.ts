import * as dotenv from 'dotenv';
dotenv.config(); 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  console.log('URL de BD:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar validaciones globales (para que funcionen los DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora datos que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían datos extra
      transform: true, // Convierte los tipos de datos automáticamente
    }),
  );

  // 2. Habilitar CORS para que el frontend (ej. localhost:3000) pueda conectar
  app.enableCors({
      origin: 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }
  );

  // 3. Prefijo para todas las rutas (opcional pero recomendado: api/v1/...)
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000/api`);
}
bootstrap();

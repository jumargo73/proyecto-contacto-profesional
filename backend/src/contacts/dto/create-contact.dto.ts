import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identification_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  // Datos del Servicio (Subject y Descripción)

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

 
}


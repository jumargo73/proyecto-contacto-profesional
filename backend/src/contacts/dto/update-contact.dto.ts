// src/contacts/dto/update-contact.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateContactDto {
  @IsString() @IsOptional() nombre?: string;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() cedula?: string;
  @IsString() @IsOptional() service?: string; // <--- Cambiado de subject a servicio
  @IsString() @IsOptional() descripcion?: string;
  @IsString() @IsOptional() estado?: string;
}


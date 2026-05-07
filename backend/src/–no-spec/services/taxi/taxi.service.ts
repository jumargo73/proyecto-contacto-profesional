import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // O la ruta de tu cliente generado

@Injectable()
export class TaxiService {
  // Inicializamos el cliente de Prisma directamente o vía un módulo
  constructor(private prisma: PrismaService) {}

  async crearServicio(data: any) {
    return this.prisma.taxiServices.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        phone: data.phone,
        rutaIni: data.rutaIni,
        rutaFin: data.rutaFin,
      },
    });
  }

  async obtenerTodos() {
    return this.prisma.taxiServices.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}


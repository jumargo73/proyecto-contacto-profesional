import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de que la 
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';


@Injectable()
export class ContactsService {

  // 1. Inyectamos Prisma en el constructor
  constructor(private prisma: PrismaService) {}

  // 2. Modificamos el método create para que sea asíncrono y use Prisma
  async create(createContactDto: CreateContactDto) {
    return await this.prisma.contact.upsert({
      where: { cedula: createContactDto.identification_number },
      update: {
        servicios: { 
          create: { 
            subject: createContactDto.subject,
            descripcion: createContactDto.descripcion || '',
            history: {
              create: {
                status: 'PENDIENTE', // Asegúrate que coincida con tu Enum
                comment: 'Registro inicial del servicio'
              }
            }  
          }
        }
      },
      create: {
        nombre: createContactDto.name,
        email: createContactDto.email,
        phone: createContactDto.phone,
        cedula: createContactDto.identification_number,
        servicios: { 
          create: { 
            subject: createContactDto.subject, 
            descripcion: createContactDto.descripcion || '',
            history: {
              create: {
                status: 'PENDIENTE', // Asegúrate que coincida con tu Enum
                comment: 'Registro inicial del servicio'
              }
            }          
          } 
        }
      },
      include: { servicios: true } // Esto devuelve la lista de servicios del cliente
    });    
  }

  // 3. Modificamos el findAll para traer todos los registros
  
  async findAll() {
    const data = await this.prisma.contact.findMany({
      include: {
        servicios: {
          include: {
            history: { orderBy: [{ createdAt: 'desc'},{id: 'desc' }], take: 1 }
          }
        }
      }
    });

    // Aplanamos para que sea fácil de listar
    return data.flatMap(contacto => 
      contacto.servicios.map(servicio => ({
        cliente: contacto.nombre,
        cedula: contacto.cedula,
        phone: contacto.phone,
        email: contacto.email,
        servicio: servicio.subject,
        idServicio: servicio.id,
        descripcion: servicio.descripcion,
        estado: servicio.history[0]?.status || 'SIN ESTADO',
        fecha: servicio.history[0]?.createdAt
      }))
    );
  }



  // Ejemplo de cómo debería quedar el findOne en contacts.service.ts
  async findOne(id: number) {
    return await this.prisma.contact.findUnique({
      where: { id: Number(id) },
        include: {
          servicios: {
            include: {
              history: {
                orderBy: [{ createdAt: 'desc'},{id: 'desc' }],
                take: 1
              }
            }
          }
        }
    });
  }


 
  async update(id: number, updateDto: any) {
   
    return await this.prisma.service.update({
      where: { id },
      data: {
        subject: updateDto.service,
        descripcion: updateDto.descripcion,
        // CREAMOS un nuevo historial para que la tabla se actualice sola
        history: {
          create: {
            status: updateDto.estado, // El "nuevoEstado" que viene del select
            comment: 'Actualizado desde el panel'
          }
        }
      },
      // IMPORTANTE: Incluir el historial nuevo para que el frontend lo reciba
      include: {
        history: { orderBy:[{ createdAt: 'desc'},{id: 'desc' }], take: 1 }
      }
    });
  }

  async remove(id: number) {

    return await this.prisma.contact.delete({
      where: { id }
    });
    
  }
  
}

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
    return await this.prisma.contact.create({
      data: createContactDto,
    });
  }

  // 3. Modificamos el findAll para traer todos los registros
  async findAll() {
    return await this.prisma.contact.findMany();
  }

  // Ejemplo de cómo debería quedar el findOne en contacts.service.ts
  async findOne(id: number) {
    return await this.prisma.contact.findUnique({
      where: { id }
    });
  }

 
  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}

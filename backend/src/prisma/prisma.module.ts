import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Esto hace que no tengas que importar PrismaModule en cada módulo nuevo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ¡Muy importante para que sea visible fuera!
})
export class PrismaModule {}


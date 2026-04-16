import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a tu servicio de Prisma
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    // 1. Buscar al usuario en la base de datos de Prisma
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 2. Comparar la contraseña enviada con el hash de la DB
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 3. Si todo está bien, generamos el JWT Payload
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}


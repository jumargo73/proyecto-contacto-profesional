import { Injectable, UnauthorizedException ,ConflictException} from '@nestjs/common';
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

  async register(name:string,email: string, pass: string){

    // 1. Buscar si el usuario YA existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    // SI existe, lanzamos error
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // 2. Hashear la contraseña ANTES de guardar
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(pass, saltRounds);

    // 3. Crear el usuario
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role: 'user' // Asegúrate de definir un valor por defecto si tu modelo lo requiere
      },
    });

    // 4. Retornar el usuario (o el JWT si prefieres auto-login)
    // Nota: No retornes el password nunca, ni siquiera hasheado
    const { password, ...result } = newUser;
    return result;
  }
}


import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a tu servicio de Prisma
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string, // Debe ser la misma del módulo
    });
  }

  async validate(payload: any) {
    // Lo que devuelvas aquí se inyectará en req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

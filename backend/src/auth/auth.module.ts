import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Asegúrate de tener exportado PrismaService
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'MI_LLAVE_SECRETA_TECH_2024', // Usa una variable de entorno (.env) en producción
      signOptions: { expiresIn: '2h' },      // El token expirará en 2 horas
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

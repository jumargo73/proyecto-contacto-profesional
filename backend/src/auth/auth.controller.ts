import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // La URL será: http://localhost:3000/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: any) {
    // Aquí recibimos el body { email, password }
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register') // Ruta: /api/auth/register
  async register(@Body() dto: any) { 
    return this.authService.register(dto.name,dto.email, dto.password);
  
  }
}

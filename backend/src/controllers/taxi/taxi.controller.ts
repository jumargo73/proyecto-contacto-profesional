import { Controller, Post, Get, Body } from '@nestjs/common';
import { TaxiService } from '../../–no-spec/services/taxi/taxi.service';

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  @Post('solicitar')
  async solicitarTaxi(@Body() datos: any) {
    return this.taxiService.crearServicio(datos);
  }

  @Get('lista')
  async listarServicios(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}

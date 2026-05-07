import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { TaxiService } from './–no-spec/services/taxi/taxi.service';
import { TaxiController } from './controllers/taxi/taxi.controller';

@Module({
  imports: [
            PrismaModule,
            ContactsModule,
            PrismaModule,
            AuthModule,
            ConfigModule.forRoot({
              isGlobal: true, // Hace que las variables se vean en todos los módulos
            })],
  controllers: [AppController, TaxiController],
  providers: [AppService, TaxiService],
})
export class AppModule {}

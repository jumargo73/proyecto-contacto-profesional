import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
            PrismaModule,
            ContactsModule,
            PrismaModule,
            AuthModule,
            ConfigModule.forRoot({
              isGlobal: true, // Hace que las variables se vean en todos los módulos
            })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

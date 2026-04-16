import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ContactsModule,PrismaModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

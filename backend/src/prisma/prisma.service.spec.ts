// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super(); // No pases { engine: "classic" } aquí, causará el error TS2353
  }

  async onModuleInit() {
    await this.$connect();
  }
}


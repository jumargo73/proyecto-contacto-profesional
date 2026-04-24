// prisma/seed.ts
import { PrismaClient } from '../generated/client/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Definimos la contraseña que usarás para entrar
  const passwordPlana = 'Admin123*'; // Cambia esto por una clave segura
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(passwordPlana, saltRounds);

  // 2. Creamos (o actualizamos) el usuario administrador
  const admin = await prisma.user.upsert({
    where: { email: 'tu-correo@tech.com' }, // Cambia por tu correo
    update: {},
    create: {
      email: 'tu-correo@tech.com',
      name: 'Administrador Tech',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  console.log({ adminCreado: admin.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Definir ADMIN_EMAIL y ADMIN_PASSWORD en el .env antes de correr esto');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: { email, passwordHash },
  });

  console.log('Admin creado:', email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
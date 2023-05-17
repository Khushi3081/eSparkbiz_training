import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function data() {
  return await prisma.role.create({
    data: {
      name: 'user',
    },
  });
}
data();

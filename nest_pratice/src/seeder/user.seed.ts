import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;
const prisma = new PrismaClient();

async function data() {
  return await prisma.user.create({
    data: {
      name: 'Khushi',
      email: 'khushi@gmail.com',
      password: await bcrypt.hash('123', 10),
      role_id: 1,
    },
  });
}
data();

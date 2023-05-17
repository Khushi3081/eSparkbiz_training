import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { user, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUser(): Promise<user[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: user): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }
}

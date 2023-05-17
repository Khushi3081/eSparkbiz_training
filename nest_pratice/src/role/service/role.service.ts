import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { role, Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async getAllRole(): Promise<role[]> {
    return this.prisma.role.findMany();
  }
  async createRole(data: role): Promise<role> {
    return this.prisma.role.create({
      data,
    });
  }
}

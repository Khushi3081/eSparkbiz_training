import { Injectable, Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  // imports: [],
  providers: [RoleService, PrismaService],
  controllers: [RoleController],
})
export class RoleModule {}

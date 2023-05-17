import { Injectable, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  // imports: [],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}

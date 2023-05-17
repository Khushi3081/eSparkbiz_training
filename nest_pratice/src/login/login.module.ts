import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [LoginService, PrismaService],
  controllers: [LoginController],
})
export class LoginModule {}

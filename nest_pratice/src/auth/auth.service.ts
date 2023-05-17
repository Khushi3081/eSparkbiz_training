import { Injectable } from '@nestjs/common';
import  userDataDto  from 'src/user/dto/user.dto';
import { user, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcryptjs";
const saltRounds = 10
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(postData: userDataDto) {
     const hashPass = await bcrypt.hash(postData.password, saltRounds)
      postData.password = hashPass;
      return this.prisma.user.create({
        data:{
          name:postData.name,
          email:postData.email,
          password:postData.password
        }
      })

  }
}

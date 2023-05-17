import { Injectable, Redirect } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { loginDataDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async checkUser(postData: loginDataDto) {
    const email = postData.email;
    const data = await this.prisma.user.findFirst({
      where: { email: String(email) },
    });
    const pass = postData.password;
    const answer = await bcrypt.compare(pass, data.password);
    return answer

  }

}

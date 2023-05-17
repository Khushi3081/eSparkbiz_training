import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { loginDataDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  prisma: any;
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @Render('login')
  root() {}

  @Post()
  async checkUser(@Body() postData: loginDataDto, @Res() res: Response) {
    const condition = await this.loginService.checkUser(postData);
    // console.log(condition);

    if (condition) {
      // console.log('condition', condition);
      res.redirect('/');
    } else {
      // console.log('condition', condition);
      res.redirect('/login');
    }
  }
}

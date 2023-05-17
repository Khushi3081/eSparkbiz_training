import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { user } from '@prisma/client';
import  userDataDto  from '../dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  async getAllTodo(): Promise<user[]> {
    return this.UserService.getAllUser();
  }
  @Post()
  async createTodo(@Body() postData: userDataDto) {
    return this.UserService.createUser(postData);
  }
}

import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { role } from '@prisma/client';

@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Get()
  async getAllRole() {
    return this.RoleService.getAllRole();
  }
  @Post()
  async createTodo(@Body() postData: role): Promise<role> {
    return this.RoleService.createRole(postData);
  }
}

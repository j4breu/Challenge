import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) { }

  @Post()
  createRole(@Body() newRole: CreateRoleDto) {
    return this.roleService.createRole(newRole)
  }
}

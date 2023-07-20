import { Body, Controller, Delete, Get, Patch, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) { }

  @Post()
  createRole(@Body() newRole: CreateRoleDto) {
    return this.roleService.createRole(newRole)
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getRole(id);
  }

  @Patch(':id')
  updateRole(@Param('id', ParseIntPipe) id: number, @Body()
  role: UpdateRoleDto) {
    return this.roleService.updateRole(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteRole(id);
  }
}

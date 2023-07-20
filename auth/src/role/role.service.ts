import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) { }

  async createRole(role: CreateRoleDto) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        name: role.name
      }
    })

    if (roleFound) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT)
    }

    const newRole = this.roleRepository.create(role)
    return this.roleRepository.save(newRole);
  }

  getRoles() {
    return this.roleRepository.find();
  }

  async getRole(id: number) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        id
      }
    });

    if (!roleFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }

    return roleFound;
  }

  async searchRole(name: string) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        name
      }
    });

    if (!roleFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }

    return roleFound;
  }

  async updateRole(id: number, role: UpdateRoleDto) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        id
      }
    });

    if (!roleFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const updatedRole = Object.assign(roleFound, role);
    return this.roleRepository.save(updatedRole);
  }

  async deleteRole(id: number) {
    const result = await this.roleRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}

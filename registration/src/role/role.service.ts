import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly httpService: HttpService
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

    this.httpService.post(`http://localhost:8001/api/role/${roleFound}`, {});
    this.httpService.post(`http://localhost:8003/api/role/${roleFound}`, {});

    return this.roleRepository.save(newRole);
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
}

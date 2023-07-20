import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
HttpService;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private roleService: RoleService,
    private httpService: HttpService
  ) { }

  async createUser(user: CreateUserDto, roleName: string) {
    
    const roleFound = await this.roleService.searchRole(roleName)

    if(!roleFound)
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email
      }
    })

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.OK);
    }
    
    user.roleId = roleFound.id;

    this.httpService.post(`http://localhost:8001/api/user/${user}`, {});
    this.httpService.post(`http://localhost:8003/api/user/${user}`, {});

    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async searchUser(email: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        email
      }
    });

    return userFound;
  }

  async updateUser(user: UpdateUserDto) {
    const userFound = await this.searchUser(user.email);({
      where: {
        email: user.email
      }
    });

    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
  }

}

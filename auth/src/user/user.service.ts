import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private roleService: RoleService
  ) { }

  async signIn(email: string, password: string ) {
    const userFound = await this.searchUser(email);

    if (!userFound || password !== userFound.password) {
      throw new HttpException('Credentials invalid', HttpStatus.UNAUTHORIZED)
    }
    
    const roleFound = await this.roleService.getRole(userFound.roleId)

    if (roleFound.name !== "admin") {
      throw new HttpException('Credentials invalid', HttpStatus.UNAUTHORIZED)
    }

    return userFound;
  }
 
  async searchUser(email: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        email
      }
    });

    return userFound;
  }

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email
      }
    })

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return userFound;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
         id
      }
    });

    if(!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}

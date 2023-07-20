import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
HttpService;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private httpService: HttpService
  ) { }

  async createUser(user: CreateUserDto) {
    
    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find({
      relations: ['reservations']
    });
  }

  async searchUser(email: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        email
      }
    });

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

    this.httpService.post(`http://localhost:8001/api/user/${user}`, {});
    this.httpService.post(`http://localhost:8002/api/user/${user}`, {});

    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
  }

}

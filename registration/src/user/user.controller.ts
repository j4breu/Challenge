import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }
  
  @Post()
  createUser(@Body() newUser: CreateUserDto, name: string) {
    return this.userService.createUser(newUser, name);
  }
}

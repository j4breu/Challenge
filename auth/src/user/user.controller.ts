import { Body, Controller, Delete, Get, Patch, Param, ParseIntPipe, Post, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject('RESERVATION_TOKEN') private readonly client
  ) {
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser)
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('signin')
  signIn(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.userService.signIn(email, password);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body()
  user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}

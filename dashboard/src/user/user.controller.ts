import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }
  
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body()
  user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
}

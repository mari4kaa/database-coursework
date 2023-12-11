import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() dto: UserCreateDto) {
    return this.userService.create(dto);
  }

  @Get(':id')
  getSingleUser(@Param('id', ParseIntPipe) userId: number) {
    const user = this.userService.getSingleUser(userId);
    return user;
  }

  @Get()
  getAllUsers() {
    const users = this.userService.getAllUsers();
    return users;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UserUpdateDto,
  ) {
    return this.userService.update(userId, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}

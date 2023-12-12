import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/surveys/grouped/:id')
  findSurveysByUserGrouped(@Param('id') id: string) {
    return this.usersService.findSurveysByUserGrouped(id);
  }

  @Get('/surveys/:id')
  findSurveysByUser(@Param('id') id: string) {
    return this.usersService.findSurveysByUser(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}

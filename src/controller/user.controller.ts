import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { UserSevice } from "src/services/user.service";
import { ValidateUser } from "src/utils/filters/validate_user.filter";

@Controller('user')
export class UserController {
  constructor(private readonly service: UserSevice) {}

  @Post('/login')
  login() {}

  @Post()
  @UseInterceptors(new ValidateUser())
  async create(
    @Body() value: UserDTO
  ) {
    await this.service.create(value);
  }

  @Delete()
  async delete(
    @Body() value: { username: string }
  ) {
    await this.service.delete(value.username);
  }

  @Patch(':id')
  async updateName(
    @Body() value: { name: string },
    @Param('id') user: string
  ) {
    await this.service.updateName({
      user: user,
      name: value.name
    })
  }

}
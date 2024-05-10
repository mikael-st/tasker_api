import { Body, Controller, Delete, Get, Post, UseInterceptors } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { UserSevice } from "src/services/user.service";
import { ValidateUser } from "src/utils/filters/validate_user.filter";

@Controller('user')
export class UserController {
  constructor(private readonly service: UserSevice) {}

  @Get()
  getUsers() {}

  @Post()
  @UseInterceptors(new ValidateUser())
  async create(
    @Body() value: UserDTO
  ) {
    await this.service.create(value);
  }

  // @Delete()
  // async delete(
  //   @Body() value: UserDTO
  // ) {
  // }

}
import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { UserSevice } from "src/services/user.service";

@Controller('user')
export class UserController {
  constructor(private readonly service: UserSevice) {}

  @Get()
  getUsers() {}

  @Post()
  async create(
    @Body() value: UserDTO
  ) {
    await this.service.create(value).then(
      (resp) => {return resp}
    );
  }

  @Delete()
  deleteByUsername() {}

}
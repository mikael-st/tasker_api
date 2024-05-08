import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { User } from "src/DTO/user.dto";

@Controller('user')
export class UserController {
  // constructor(private readonly model) {}

  @Get()
  getAllUsers() {}

  @Post()
  create(
    @Body() value: User
  ) {
    return 'ok'
  }

  @Delete()
  deleteByUsername() {}

}
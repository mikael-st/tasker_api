import { Body, Controller, Delete, Get, Post, UseFilters } from "@nestjs/common";
import { response } from "express";
import { UserDTO } from "src/DTO/user.dto";
import { UserSevice } from "src/services/user.service";
import { HttpExceptionFilter } from "src/utils/exception.filter";

@Controller('user')
export class UserController {
  constructor(private readonly service: UserSevice) {}

  @Get()
  getUsers() {}

  @Post()
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
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { ValidateUser } from "src/utils/filters/validate_user.filter";

@Controller('users')
export class UserController {
  constructor(
    private readonly repository: UserRepository,
    private readonly auth:       AuthService
  ) {}

  @Post('/login')
  async login(
    @Body() values: {username: string, pass: string}
  ) {
    return this.auth.validate(values);
  }

  @Post()
  @UseInterceptors(new ValidateUser())
  async create(
    @Body() value: UserDTO
  ) {
    return await this.repository.create(value);
  }

  @Get()
  async list() {
    return await this.repository.list();
  }

  @Get(':username')
  async find(
    @Param('username') username: string
  ) {
    console.log(username);
    
    return await this.repository.find(username);
  }

  // @Delete()
  // async delete(
  //   @Body() value: { username: string }
  // ) {
  //   await this.repository.delete(value.username);
  // }

  // @Patch(':id')
  // async updateName(
  //   @Body() value: { name: string },
  //   @Param('id') user: string
  // ) {
  //   await this.repository.updateName({
  //     user: user,
  //     name: value.name
  //   });
  // }

}
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RelationRequestRepository, SendRelationRequestDTO } from "@repositories/relation_request.repository";
import { UserDTO } from "src/DTO/user.dto";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/auth/auth.guard";
import { ValidateUser } from "src/utils/filters/validate_user.filter";

@Controller('user')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly relationRepository: RelationRequestRepository,
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
    return await this.userRepository.create(value);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async list() {
    return await this.userRepository.list();
  }

  @Get(':username')
  async find(
    @Param('username') username: string
  ) {
    console.log(username);
    
    return await this.userRepository.find(username);
  }

  @Post('/relation')
  async send(
    @Body() data: SendRelationRequestDTO
  ){
    await this.relationRepository.create(data);
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
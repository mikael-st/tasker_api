import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RelationService } from "@services/relation.service";
import { UserDTO } from "src/DTO/user.dto";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/auth/auth.guard";
import { ValidateUser } from "src/utils/filters/validate_user.filter";

@Controller('users')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly relationService: RelationService,
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

  @Post('/invite')
  async send(
    @Body() data: any
  ){
    return await this.relationService.send(data);
  }

  @Get('/invite/:username')
  async listRequests(
    @Param('username') username: string
  ){
    return await this.relationService.list(username);
  }

  @Put('/invite/:id/accept')
  async accept(
    @Param('id') invite_id: string
  ){
    return await this.relationService.accept(invite_id);
  }

  // @Delete()
  // async delete(
  //   @Body() value: { username: string }
  // ) {
  //   await this.repository.delete(value.username);
  // }
}
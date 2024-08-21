import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { UserNotExistsException } from "@exceptions/user_not_exists.exception";
import { Repository } from "typeorm";
import { User } from "@models/user.model";
import { Result } from "@interfaces/Response";
import { InjectRepository } from "@nestjs/typeorm";
import { threadId } from "worker_threads";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly Users: Repository<User>
  ) {}

  async userExists(username: string) {
    const exists = await this.Users.findOne({
      where: {
        username: username
      }
    })

    if (exists) {
      throw new AlreadyExistsException('USER WITH THIS USERNAME ALREADY EXISTS')
    }
  }

  async create(data: UserDTO) {
    await this.userExists(data.username);
    try {
      const response = await this.Users.save(
        {
          name: data.name,
          username: data.username,
          password: data.password,
          email: data.email
        }
      )
  
      return {
        data: response,
        error: false,
        message: 'CREATED WITH SUCCESS'
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async list() {
    try {
      const response = await this.Users.find();

      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(key: string): Promise<any> {
    try {
      const response = await this.Users.findOne({
        where: {
          username: key
        },
        relations: ['projects', 'sent_invites', 'received_invites']
      })

      return response;
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async edit(id: string, update: any): Promise<any> {
    return 'to-do';
  }

  async delete(key: string): Promise<any> {
    return 'to-do';
  }

  // async find(username: string): Promise<UserDTO> {
  //   try {
  //     const user = await this.Users.findOne({
  //       username
  //     }).populate('invites');
      
  //     if (!user) {
  //       throw new UserNotExistsException();
  //     }
  //     return user;
  //   } catch (err) {
  //     throw new BadRequestException(err);
  //   }
  // }
  
  // async edit(id: string, update: any) {
  //   try {
  //     const response = await this.Users.findOneAndUpdate(
  //       { _id: id },
  //       update
  //     )

  //     return {
  //       obj: response,
  //       error: false,
  //       message: 'UPDATED WITH SUCCESS'
  //     }
  //   } catch (err) {
  //     return {
  //       obj: {},
  //       error: true,
  //       message: err
  //     }
  //   }
  // };
  
  // async delete(id: string) {
    
  // };
}
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "src/DTO/user.dto";
import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { UserNotExistsException } from "@exceptions/user_not_exists.exception";
import { Repository } from "@interfaces/Repository";
import { User } from "@models/user.model";
import { error } from "console";

@Injectable()
export class UserRepository implements Repository {
  constructor(
    @InjectModel('User') private readonly Users: Model<User>
  ) {}

  async userExists(username: string) {
    const exists = await this.Users.findOne({
      username
    });

    if (exists) {
      throw new AlreadyExistsException('USER WITH THIS USERNAME ALREADY EXISTS')
    }
  }

  async list() {
    try {
      const response = await this.Users
                          .find()
                          .populate('relation_requests')
                          .exec();

      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(username: string): Promise<UserDTO> {
    try {
      const user = await this.Users.findOne({
        username
      }).populate('relation_requests');
      
      if (!user) {
        throw new UserNotExistsException();
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async create(data: UserDTO) {
    await this.userExists(data.username);
    const user = new this.Users(data);
    try {
      await user.save()

      return 'user created with success';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  
  async edit(id: string, update: any) {
    try {
      const response = await this.Users.findOneAndUpdate(
        { _id: id },
        { $addToSet: update }
      )

      return {
        obj: response,
        error: false,
        message: 'UPDATED WITH SUCCESS'
      }
    } catch (err) {
      return {
        obj: {},
        error: true,
        message: err
      }
    }
  };
  
  async delete(id: string) {
    
  };
}

type EditUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}
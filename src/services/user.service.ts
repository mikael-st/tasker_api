import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model, Schema } from "mongoose";
import { UserDTO } from "src/DTO/user.dto";
import { IUser } from "src/config/database/models/user.model";
import { UserExistsException } from "src/utils/errors/user_exists.error";

@Injectable()
export class UserSevice {
  constructor(
    @InjectModel('user') private readonly Model: Model<IUser>
  ) {}

  async userExists(data: UserDTO) {
    const { username } = data;
    console.log(username);
    
    const exists = await this.Model.findOne({
      username: username
    });
    console.log(exists);
      
    if (exists) {
      throw new UserExistsException()
    }
  }

  async create(data: UserDTO): Promise<IResp> {
    await this.userExists(data);
    
    const user = new this.Model(data);
    try {
      await user.save()
      return {
        status: 201,
        message: 'USER CREATED'
      }
    } catch (err) {
      return {
        status: 400,
        message: err
      }
    }
  }

  async getByUsername(username: string): Promise<UserDTO[]> {
    return this.Model.find({
      username
    }).exec()
  }

  // async delete() {
  //   await this.Model.deleteOne({
  //     _id: id
  //   })
  // }
}
import { BadRequestException, Injectable, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
    
    const exists = await this.Model.findOne({
      username: username
    });
      
    if (exists) {
      throw new UserExistsException()
    }
  }

  async create(data: UserDTO) {
    await this.userExists(data);
    const user = new this.Model(data);
    try {
      await user.save()
    } catch (err) {
      throw new BadRequestException(err);
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
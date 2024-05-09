import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "src/DTO/user.dto";
import { IUser } from "src/config/database/models/user.model";


@Injectable()
export class UserSevice {
  constructor(
    @InjectModel('user') private readonly Model: Model<IUser>
  ) {}

  async create(data: UserDTO): Promise<IResp> {
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
}
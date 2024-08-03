import { BadRequestException, Injectable, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "src/DTO/user.dto";
import { User } from "src/config/database/models/user.model";
import { UserExistsException } from "src/utils/errors/user_exists.error";
import { UserNotExistsException } from "src/utils/errors/user_not_exists.exception";
import { validateName } from "src/utils/validation.utils";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly Model: Model<User>
  ) {}

  async userExists(username: string) {
    const exists = await this.Model.findOne({
      username
    });

    if (exists) {
      throw new UserExistsException()
    }
  }

  async list() {
    try {
      const response = await this.Model.find().exec();

      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(username: string): Promise<UserDTO> {
    try {
      const user = await this.Model.findOne({
        username
      })
      
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
    const user = new this.Model(data);
    try {
      await user.save()

      return 'user created with success';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // async delete(data: string) {
  //   const { id } = await this.findByUsername(data);
  //   try {
  //     // await this.Model.deleteOne({
  //     //   username: data
  //     // })
  //     await prisma.user.delete({
  //       where: {
  //         id: id
  //       }
  //     })
  //     return 'deleted with success';
  //   } catch (err) {
  //     throw new BadRequestException(err);
  //   }
  // }

  // async updateName(values: {user: string, name: string}){
  //   const { id } = await this.findByUsername(values.user);
  //   validateName(values.name);
  //   try {
  //     // await this.Model.updateOne({
  //     //   username: values.user
  //     // }, {
  //     //   name: values.name
  //     // })
  //     await prisma.user.update({
  //       where: {
  //         id: id
  //       },
  //       data: {
  //         name: values.name
  //       }
  //     })
  //   } catch (err) {
  //     throw new BadRequestException(err);
  //   }
  // }

  // async updateUsername(){

  // }

  // async updatePassword(){

  // }
}
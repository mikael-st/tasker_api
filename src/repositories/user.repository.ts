import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { UserNotExistsException } from "@exceptions/user_not_exists.exception";
import { User } from "@models/user.model";
import { Result } from "@interfaces/Response";
import { InjectModel } from "@nestjs/sequelize";
import { Invite } from "@models/invite.model";
import { Relation } from "@models/relation.model";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User) private readonly Users: typeof User
  ) {}

  async userExists(username: string) {
    const exists = await this.Users.findByPk(username);

    if (exists) {
      throw new AlreadyExistsException('USER WITH THIS USERNAME ALREADY EXISTS')
    }
  }

  async create(data: UserDTO) {
    await this.userExists(data.username);
    try {
      const response = await this.Users.create(
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
      const response = await this.Users.findAll();

      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(key: string): Promise<any> {
    try {
      const user = await this.Users.findOne({
        where: {
          username: key
        },
        include: [
          {
            model: Invite,
            as: 'invites'
          },
          {
            model: Relation,
            as: 'relations'
          },
          {
            model: Relation,
            as: 'related'
          }
        ]
      });

      if (!user) {
        throw new UserNotExistsException();
      }

      return user;
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async edit(username: string, update: any): Promise<any> {
    try {
      const response = await this.Users.update(
        update,
        {
          where: {
            username: username
          },
          returning: true
        },
      );
      
      return {
        data: response,
        error: false,
        message: "CHANGED"
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(key: string): Promise<any> {
    return 'to-do';
  }
}
import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserNotExistsException } from "../errors/user_not_exists.exception";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "src/DTO/user.dto";
import { IUser } from "src/config/database/models/user.model";
import { compare } from "bcryptjs";
import { InvalidPasswordException } from "../errors/invalid_password.exception";

@Injectable()
export class LoginIterceptor implements NestInterceptor {
  constructor(@InjectModel('user') private readonly Model: Model<IUser>){}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    
    const { username, password } = request.body;
    const user = await this.getUser(username);
    this.isSamePassword(user, password);
    request.headers.user = user.id;
    
    return next.handle();
  }

  async getUser(username: string): Promise<UserDTO> {
    try {
      const user = await this.Model.findOne({
        username
      });
      if (!user) {
        throw new UserNotExistsException();
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async isSamePassword(user: UserDTO, password: string) {
    const same = await compare(password, user.password);
    if (!same) {
      throw new InvalidPasswordException('incorret password', 401);
    }
  }
}
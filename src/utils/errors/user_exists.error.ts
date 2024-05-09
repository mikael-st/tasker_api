import { HttpException } from "@nestjs/common";

export class UserExistsException extends HttpException {
  constructor() {
    super('user with this username alredy exists', 400)
  }
}
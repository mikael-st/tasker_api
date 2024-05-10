import { HttpException } from "@nestjs/common";

export class InvalidPasswordException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
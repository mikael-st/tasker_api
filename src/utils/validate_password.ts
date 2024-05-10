import { UserDTO } from "src/DTO/user.dto";
import { InvalidPasswordException } from "./errors/invalid_password.exception";
import { maxLength, minLength } from "class-validator";

export abstract class ValidatePassword {
  validatePassword(data: UserDTO) {
    this.minLengthValid(data);
    this.maxLengthValid(data);
  }

  havePassword(data: UserDTO) {
    if (data.password) { return true } else { return false };
  }

  minLengthValid(data: UserDTO) {
    if (this.havePassword(data) && minLength(data.password, 8)) { 
      return;
    } else {
      throw new InvalidPasswordException('invalid password, password must have at least 8 characters');
    };
  }

  maxLengthValid(data: UserDTO) {
    if (this.havePassword(data) && maxLength(data.password, 20)) { 
      return;
    } else {
      throw new InvalidPasswordException('invalid password, password is too longer')
    };
  }
}
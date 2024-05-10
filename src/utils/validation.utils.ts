import { isEmpty, isString, maxLength, minLength } from "class-validator";
import { UserDTO } from "src/DTO/user.dto";
import { InvalidNameException } from "./errors/invalid_name.exception";
import { WithoutUsernameException } from "./errors/without_username.exception";
import { InvalidPasswordException } from "./errors/invalid_password.exception";
import { UserUnnamedException } from "./errors/unnamed.exception";


export const validateFields = (data: UserDTO) => {
  validateName(data.name);
  validateUsername(data.username);
  validatePassword(data.password);
}

export const validateName = (data: string) => {
  validValue(data);
  if (isEmpty(data)) {
    throw new UserUnnamedException();
  }
}

export const validValue = (data: string) => {
  if (!isString(data)) {
    throw new InvalidNameException('name/username field from user must be a string')
  }
}

export const validateUsername = (data: string) => {
  validValue(data);
  if (isEmpty(data)) {
    throw new WithoutUsernameException();
  }
}

export const validatePassword = (data: string) => {
  minLengthValid(data);
  maxLengthValid(data);
}

export const havePassword = (data: string) => {
  if (data) { return true } else { return false };
}

export const minLengthValid = (data: string) => {
  if (havePassword(data) && minLength(data, 8)) { 
    return;
  } else {
    throw new InvalidPasswordException('invalid password, password must have at least 8 characters');
  };
}

export const maxLengthValid = (data: string) => {
  if (havePassword(data) && maxLength(data, 20)) { 
    return;
  } else {
    throw new InvalidPasswordException('invalid password, password is too longer')
  };
}
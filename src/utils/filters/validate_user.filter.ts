import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { isDefined, isNotEmpty, isString, isEmpty } from "class-validator";
import { Observable, catchError } from 'rxjs';
import { UserDTO } from "src/DTO/user.dto";
import { UserUnnamedException } from "../errors/unnamed.exception";
import { WithoutUsernameException } from "../errors/without_username.exception";
import { ValidatePassword } from "../validate_password";
import { InvalidNameException } from "../errors/invalid_name.exception";

@Injectable()
export class ValidateUser extends ValidatePassword implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const body: UserDTO = request.body;
    console.log(body);
    
    this.validate(body);

    return next.handle().pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  validate(data: UserDTO){
    this.haveName(data);
    this.haveUsername(data);
    this.validatePassword(data);
  }

  haveName(data: UserDTO) {
    this.validName(data);
    if (isEmpty(data.name) && !isDefined(data.name)) {
      throw new UserUnnamedException();
    }
  }

  validName(data: UserDTO) {
    if (!isString(data.name)) {
      throw new InvalidNameException('name field from user must be a string')
    }
  }

  haveUsername(data: UserDTO) {
    if (!data.username && !isString(data.username) && !isNotEmpty(data.username) && !isDefined(data.name)) {
      throw new WithoutUsernameException();
    }
  }
}
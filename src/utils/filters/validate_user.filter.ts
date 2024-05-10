import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError } from 'rxjs';
import { UserDTO } from "src/DTO/user.dto";
import { ValidatePassword } from "./validate_password";
import { validateFields } from "../validation.utils";

@Injectable()
export class ValidateUser extends ValidatePassword implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const body: UserDTO = request.body;
    
    validateFields(body);

    return next.handle().pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
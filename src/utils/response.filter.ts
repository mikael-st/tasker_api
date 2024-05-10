import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError } from "rxjs";

@Injectable()
export class ResponseFilter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const response = context.switchToHttp().getResponse();

    console.log(response);
    
    
    return next.handle();
  }
}
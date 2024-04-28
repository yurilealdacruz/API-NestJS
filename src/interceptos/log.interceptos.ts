import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";



export class LogInterceptor implements  NestInterceptor {
    intercept(context: ExecutionContext, next : CallHandler) : Observable <any>  {

        const dt = Date.now();

        return next.handle().pipe(tap(() => {

            const request = context.switchToHttp().getRequest()

            console.log(`Método: ${request.method}`)
            console.log(`URL: ${request.url}`)
            console.log(`A execução demorou ${ Date.now() - dt}ms`)
        }))

    }
}
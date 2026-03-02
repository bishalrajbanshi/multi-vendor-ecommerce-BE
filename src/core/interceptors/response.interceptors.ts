import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        const plain = instanceToPlain(data);

        let message: string | undefined;
        let payload: any = plain;
        let pagination: any | undefined;

        if (plain && typeof plain === 'object') {
          if ('message' in plain) {
            message = (plain as any).message;
          }
          if ('data' in plain) {
            payload = (plain as any).data;
          }
          if ('pagination' in plain) {
            pagination = (plain as any).pagination;
          }
        }

        const base: any = {
          status: response.statusCode || HttpStatus.OK,
          success: true,
          message: message ?? 'Success',
          data: Array.isArray(payload)
            ? payload.map((d) => instanceToPlain(d))
            : payload,
        };
        if (pagination !== undefined) {
          base.pagination = pagination;
        }
        return base;
      }),
    );
  }
}

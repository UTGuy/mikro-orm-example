import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { EntityManager } from 'mikro-orm';
import { flatMap } from 'rxjs/operators';
import { AsyncSubject } from 'rxjs';

@Injectable()
export class FlushRequestInterceptor implements NestInterceptor {
    constructor(private readonly em: EntityManager) {
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(flatMap(x => this.run(x), x => x));
    }

    async run(data) {
        try {
            console.log("Flushing");
            await this.em.flush();
        } catch (ex) {
            throw ex;
        }
        return data;
    }
}
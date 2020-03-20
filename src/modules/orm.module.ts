import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { FlushRequestInterceptor } from './flushRequest.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { config } from './orm.config';

console.log(config);

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: FlushRequestInterceptor
    }
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
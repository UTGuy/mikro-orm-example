import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrmModule } from './modules/orm.module';
import { AppCqrsModule } from './modules/cqrs.module';

@Module({
  imports: [OrmModule, AppCqrsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

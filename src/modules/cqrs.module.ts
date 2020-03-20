import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DoSomethingCommandHandler } from 'src/command.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    DoSomethingCommandHandler
  ],
  exports: [CqrsModule]
})
export class AppCqrsModule {}
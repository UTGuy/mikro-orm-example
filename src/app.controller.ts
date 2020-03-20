import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DoSomethingCommand } from './command.handler';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) { }

  @Get("doSomething")
  async doSomething() {
    const command = new DoSomethingCommand("bar");
    const result = await this.commandBus.execute(command);
    return result;
  }

  @Get("/")
  async test() {
    return "test";
  }
}

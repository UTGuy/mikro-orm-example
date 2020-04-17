import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { EntityManager } from "mikro-orm";
import { FooEntity } from "./foo.entity";
import { BazEntity } from "./baz.entity";

export class DoSomethingCommand {
    constructor(public readonly value: string) {
    }
}

@CommandHandler(DoSomethingCommand)
export class DoSomethingCommandHandler implements ICommandHandler<DoSomethingCommand> {
    constructor(private readonly em: EntityManager) {
    }

    async execute(command: DoSomethingCommand): Promise<void> {
        const bazRepo = this.em.getRepository(BazEntity);
        const baz = await bazRepo.findOne(command.value, ["foo"]);
        const fooRepo = this.em.getRepository(FooEntity);
        const foo = await fooRepo.findOne(baz.foo.id);
        fooRepo.remove(foo);
    }

}
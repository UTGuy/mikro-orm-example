import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { EntityManager } from "mikro-orm";
import { FooEntity } from "./foo.entity";

export class DoSomethingCommand {
    constructor(public readonly value: string) {
    }
}

@CommandHandler(DoSomethingCommand)
export class DoSomethingCommandHandler implements ICommandHandler<DoSomethingCommand> {
    constructor(private readonly em: EntityManager) {
    }

    async execute(command: DoSomethingCommand): Promise<FooEntity> {
        const repo = this.em.getRepository(FooEntity);
        const foo = new FooEntity(command.value);
        repo.persist(foo);
        return foo;
    }

}
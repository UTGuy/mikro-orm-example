import * as uuid from "uuid";
import { AnyEntity, PrimaryKey, Entity, ManyToOne, OneToOne } from "mikro-orm";
import { FooEntity } from "./foo.entity";

@Entity()
export class BazEntity implements AnyEntity<BazEntity, "id"> {
    constructor() {
        this.id = uuid.v4();
    }

    @PrimaryKey()
    public id: string;

    @OneToOne(() => FooEntity)
    public foo?: FooEntity;

    setFoo(foo: FooEntity) {
        this.foo = foo;
    }
}
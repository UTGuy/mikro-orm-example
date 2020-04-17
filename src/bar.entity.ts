import * as uuid from "uuid";
import { AnyEntity, PrimaryKey, Entity, ManyToOne } from "mikro-orm";
import { FooEntity } from "./foo.entity";

@Entity()
export class BarEntity implements AnyEntity<BarEntity, "id"> {
    constructor(foo: FooEntity) {
        this.id = uuid.v4();
        this.foo = foo;
    }

    @PrimaryKey()
    public id: string;

    @ManyToOne(() => FooEntity)
    public foo: FooEntity;
}
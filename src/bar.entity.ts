import * as uuid from "uuid";
import { AnyEntity, PrimaryKey, Property, Entity } from "mikro-orm";

@Entity()
export class BarEntity implements AnyEntity<BarEntity, "id"> {
    constructor(value: string) {
        this.id = uuid.v4();
        this.value = value;
    }

    @PrimaryKey()
    readonly id: string;

    @Property()
    public value: string;
}
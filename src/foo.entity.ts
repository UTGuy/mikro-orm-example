import * as uuid from "uuid";
import { AnyEntity, PrimaryKey, Entity, OneToMany, Collection, OneToOne } from "mikro-orm";
import { BarEntity } from "./bar.entity";
import { BazEntity } from "./baz.entity";

@Entity()
export class FooEntity implements AnyEntity<FooEntity, "id"> {
    constructor(baz: BazEntity) {
        this.id = uuid.v4();
        this.baz = baz;
        this.bars = new Collection<BarEntity>(this, []);
    }

    @PrimaryKey()
    public id: string;

    @OneToOne(() => BazEntity)
    public baz: BazEntity;

    @OneToMany(() => BarEntity, bar => bar.foo)
    public bars: Collection<BarEntity>;

    public setBars(bars: BarEntity[]) {
        this.bars = new Collection(this, bars);
    }
}
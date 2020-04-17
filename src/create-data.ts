import { MikroORM } from 'mikro-orm';
import { config } from './modules/orm.config';
import { FooEntity } from './foo.entity';
import { BarEntity } from './bar.entity';
import { BazEntity } from './baz.entity';

(async () => {
    console.log(config);
    const orm = await MikroORM.init(config);
    const generator = orm.getSchemaGenerator();
    await generator.execute(`truncate table baz_entity cascade;`);

    // create some test data
    const baz = new BazEntity();
    baz.id = "baz";
    const foo = new FooEntity(baz);
    foo.id = "foo";
    baz.setFoo(foo);
    const bar = new BarEntity(foo);
    bar.id = "bar";
    foo.setBars([bar]);

    await orm.em.persist(baz);
    await orm.em.persist(foo);
    await orm.em.flush();

    await orm.close(true);
})();
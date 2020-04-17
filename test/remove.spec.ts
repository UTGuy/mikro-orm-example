import { MikroORM, EntityManager, IDatabaseDriver, Connection } from 'mikro-orm';
import { FooEntity } from '../src/foo.entity';
import { config } from '../src/modules/orm.config';
import { BarEntity } from '../src/bar.entity';
import { BazEntity } from '../src/baz.entity';

async function createData(em: EntityManager) {
  const baz = new BazEntity();
  const foo = new FooEntity(baz);
  baz.setFoo(foo);
  const bar = new BarEntity(foo);
  foo.setBars([bar]);

  const fooRepo = em.getRepository(FooEntity);
  fooRepo.persist(foo);
  await em.flush();
  em.clear();
  return baz;
}

describe('entity remove', () => {
  let em: EntityManager,
    orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    orm = await MikroORM.init(config);
    em = orm.em;
  })

  it('should remove foo and bar', async () => {
    await expect(async () => {
      const data = await createData(em);

      const bazRepo = em.getRepository(BazEntity);
      const baz = await bazRepo.findOneOrFail(data.id, ["foo"]);
      expect(baz).toBeDefined();
      expect(baz.foo).toBeDefined();

      const fooRepo = em.getRepository(FooEntity);
      const foo = await fooRepo.findOneOrFail(baz.foo.id, ["bar"]);
      expect(foo).toBeDefined();
      expect(foo.bars).toHaveLength(1);

      const [bar] = foo.bars;
      expect(bar).toBeDefined();
      
      fooRepo.remove(foo);
      await em.flush();
      em.clear();

      const a = await fooRepo.findOne({ id: foo.id });
      expect(a).not.toBeDefined();

      const barRepo = em.getRepository(BarEntity);
      const b = await barRepo.findOne({ id: bar.id });
      expect(b).not.toBeDefined();
    }).resolves;
  });

  afterAll(async () => {
    await orm.close();
  })
})
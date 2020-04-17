import { Test, TestingModule } from '@nestjs/testing';

test('remove', async () => {
    const repo = orm.em.getRepository(Author2);
    const author = new Author2('Johny Cash', 'johny@cash.com');
    await repo.persistAndFlush(author);
    orm.em.clear();
    const a1 = await repo.findOneOrFail({ email: 'johny@cash.com' });
    repo.remove(a1);
    await orm.em.flush();
    orm.em.clear();
    const a = await repo.findAll();
    expect(a).toHaveLength(0);
  });
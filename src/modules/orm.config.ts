import { FooEntity } from "../foo.entity";
import { MikroOrmModuleOptions } from 'nestjs-mikro-orm';
import { BarEntity } from "../bar.entity";
import { BazEntity } from "../baz.entity";

export const config: MikroOrmModuleOptions = {
    entities: [BazEntity, FooEntity, BarEntity],
    type: 'postgresql',
    host: process.env.DB_CONNECTION_HOST,
    port: Number(process.env.DB_CONNECTION_PORT),
    dbName: process.env.DB_CONNECTION_DBNAME,
    user: process.env.DB_CONNECTION_USER,
    password: process.env.DB_CONNECTION_PASSWORD,
    autoFlush: false,
    debug: true//Boolean(process.env.DB_CONNECTION_DEBUG)
};
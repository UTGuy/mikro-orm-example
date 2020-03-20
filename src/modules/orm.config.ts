import { FooEntity } from "../foo.entity";
import { MikroOrmModuleOptions } from 'nestjs-mikro-orm';

export const config: MikroOrmModuleOptions = {
    entities: [FooEntity],
    type: 'postgresql',
    host: process.env.DB_CONNECTION_HOST,
    port: Number(process.env.DB_CONNECTION_PORT),
    dbName: process.env.DB_CONNECTION_DBNAME,
    user: process.env.DB_CONNECTION_USER,
    password: process.env.DB_CONNECTION_PASSWORD,
    autoFlush: false,
    debug: Boolean(process.env.DB_CONNECTION_DEBUG)
};
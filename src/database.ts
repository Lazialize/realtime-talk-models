import * as postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schemas from './schemas';

// TODO: Should be configurable
const client = postgres({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
});

const database = drizzle(client, { schema: schemas });

export default database;
export type Database = typeof database;

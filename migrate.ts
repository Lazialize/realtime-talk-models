import {migrate} from "drizzle-orm/postgres-js/migrator";
import * as postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

const migrationClient = postgres({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
  max: 1,
})

await migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" })

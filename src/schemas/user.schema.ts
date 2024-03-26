import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('user', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  accountId: uuid('account_id').notNull().unique(),
  password: varchar('password', { length: 64 }).notNull(),
  username: varchar('username', { length: 32 }).notNull(),
});

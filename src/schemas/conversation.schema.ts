import {
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const conversationSchema = pgTable('conversation', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  conversationName: varchar('conversation_name', { length: 128 }).notNull(),
  conversationType: smallint('conversation_type').notNull(),
});

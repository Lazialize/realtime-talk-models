import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { conversationSchema } from './conversation.schema.ts';
import { userSchema } from './user.schema.ts';

export const messageSchema = pgTable('message', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  conversationId: uuid('conversation_id')
    .notNull()
    .references(() => conversationSchema.id),
  authorId: uuid('author_id')
    .notNull()
    .references(() => userSchema.id),
  content: text('content').notNull(),
});

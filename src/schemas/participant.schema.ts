import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { conversationSchema } from './conversation.schema.ts';
import { userSchema } from './user.schema.ts';

export const participantSchema = pgTable(
  'participant',
  {
    id: uuid('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversationSchema.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => userSchema.id),
  },
  (table) => ({
    uniqueConversationMember: unique().on(table.conversationId, table.userId),
  }),
);

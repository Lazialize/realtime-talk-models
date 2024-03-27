import {
  conversation,
  type Conversation,
} from '../entities/conversation.entity.ts';
import database, { type Database } from '../database.ts';
import { conversationSchema, participantSchema } from '../schemas';
import { eq } from 'drizzle-orm';
import type { User } from '../entities/user.entity.ts';

/**
 * Get a conversation by its ID
 * @param conversationId The ID of the conversation
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get a specific conversation
 * const conversation = await getConversationById('123e4567-e89b-12d3-a456-426614174000');
 *
 * // Get a specific conversation using a transaction
 * db.transaction((tx) => {
 *   return getConversationById('123e4567-e89b-12d3-a456-426614174000', tx);
 * })
 */
const getConversationById = async (
  conversationId: string,
  db: Database = database,
): Promise<Conversation | undefined> => {
  const records = await db
    .select()
    .from(conversationSchema)
    .where(eq(conversationSchema.id, conversationId));

  if (records.length <= 0) {
    return undefined;
  }

  return conversation(records[0]);
};

/**
 * Get conversations by a user
 * @param user The user object
 * @param limit The number of conversations to return
 * @param offset The number of conversations to skip
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get conversations for a specific user
 * const conversations = await getConversationsByUser(user, 10, 0);
 *
 * // Get conversations for a specific user using a transaction
 * db.transaction((tx) => {
 *   return getConversationsByUser(user, 10, 0, tx);
 * })
 */
const getConversationsByUser = async (
  user: User,
  limit: number,
  offset: number,
  db: Database = database,
): Promise<Conversation[]> => {
  const records = await db
    .select({
      conversation: conversationSchema,
    })
    .from(conversationSchema)
    .leftJoin(
      participantSchema,
      eq(conversationSchema.id, participantSchema.conversationId),
    )
    .where(eq(participantSchema.userId, user.get('id')))
    .limit(limit)
    .offset(offset);

  return records.map((c) => conversation(c.conversation));
};

export default {
  getConversationById,
  getConversationsByUser,
};

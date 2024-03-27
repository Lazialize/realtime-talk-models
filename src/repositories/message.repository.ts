import { message, type Message } from '../entities/message.entity.ts';
import database, { type Database } from '../database.ts';
import { messageSchema } from '../schemas';
import { and, desc, eq, gt, lt } from 'drizzle-orm';
import type { Conversation } from '../entities/conversation.entity.ts';

/**
 * Get latest messages by a conversation
 * @param conversation The conversation object
 * @param limit The number of messages to return
 * @param offset The number of messages to skip
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get messages for a specific conversation
 * const messages = await getMessagesByConversation(conversation, 10, 0);
 *
 * // Get messages for a specific conversation using a transaction
 * db.transaction((tx) => {
 *   return getMessagesByConversation(conversation, 10, 0, tx);
 * });
 */
const getMessagesByConversation = async (
  conversation: Conversation,
  limit: number,
  offset: number,
  db: Database = database,
): Promise<Message[]> => {
  const records = await db
    .select()
    .from(messageSchema)
    .where(eq(messageSchema.conversationId, conversation.get('id')))
    .orderBy(desc(messageSchema.id))
    .limit(limit)
    .offset(offset);

  return records.map((m) => message(m));
};

/**
 * Get messages after a specific message
 * @param baseMessage The message object
 * @param limit The number of messages to return
 * @param offset The number of messages to skip
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get messages after a specific message
 * const messages = await getMessagesAfterMessage(message, 10, 0);
 *
 * // Get messages after a specific message using a transaction
 * db.transaction((tx) => {
 *   return getMessagesAfterMessage(message, 10, 0, tx);
 * });
 */
const getMessagesAfterMessage = async (
  baseMessage: Message,
  limit: number,
  offset: number,
  db: Database = database,
): Promise<Message[]> => {
  const records = await db
    .select()
    .from(messageSchema)
    .where(
      and(
        eq(messageSchema.conversationId, baseMessage.get('conversationId')),
        gt(messageSchema.id, baseMessage.get('id')),
      ),
    )
    .orderBy(desc(messageSchema.id))
    .limit(limit)
    .offset(offset);

  return records.map((m) => message(m));
};

/**
 * Get messages before a specific message
 * @param baseMessage The message object
 * @param limit The number of messages to return
 * @param offset The number of messages to skip
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get messages before a specific message
 * const messages = await getMessagesBeforeMessage(message, 10, 0);
 *
 * // Get messages before a specific message using a transaction
 * db.transaction((tx) => {
 *   return getMessagesBeforeMessage(message, 10, 0, tx);
 * });
 */
const getMessagesBeforeMessage = async (
  baseMessage: Message,
  limit: number,
  offset: number,
  db: Database = database,
): Promise<Message[]> => {
  const records = await db
    .select()
    .from(messageSchema)
    .where(
      and(
        eq(messageSchema.conversationId, baseMessage.get('conversationId')),
        lt(messageSchema.id, baseMessage.get('id')),
      ),
    )
    .orderBy(desc(messageSchema.id))
    .limit(limit)
    .offset(offset);

  return records.map((m) => message(m));
};

export default {
  getMessagesByConversation,
  getMessagesAfterMessage,
  getMessagesBeforeMessage,
};

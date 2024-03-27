import type { Conversation } from '../entities/conversation.entity.ts';
import database, { type Database } from '../database.ts';
import {
  participant,
  type Participant,
} from '../entities/participant.entity.ts';
import { conversationSchema, participantSchema } from '../schemas';
import { asc, eq } from 'drizzle-orm';

/**
 * Get a participant by a conversation
 * @param conversation The conversation object
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get participants for a specific conversation
 * const participants = await getParticipantByConversation(conversation);
 *
 * // Get participants for a specific conversation using a transaction
 * db.transaction((tx) => {
 *   return getParticipantByConversation(conversation, tx);
 * });
 */
const getParticipantByConversation = async (
  conversation: Conversation,
  db: Database = database,
): Promise<Participant[]> => {
  const records = await db
    .select({ participants: participantSchema })
    .from(participantSchema)
    .leftJoin(
      conversationSchema,
      eq(participantSchema.conversationId, conversationSchema.id),
    )
    .where(eq(conversationSchema.id, conversation.get('id')))
    .orderBy(asc(participantSchema.id));

  return records.map((p) => participant(p.participants));
};

export default {
  getParticipantByConversation,
};

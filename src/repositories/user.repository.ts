import database, { type Database } from '../database.ts';
import { userSchema } from '../schemas';
import { eq } from 'drizzle-orm';
import { type User, user } from '../entities/user.entity.ts';

/**
 * Get a user by their ID
 * @param userId The ID of the user
 * @param db The database connection object. If you want to use a transaction, you can pass it here.
 *
 * @example
 * // Get a specific user
 * const user = await getUserById('123e4567-e89b-12d3-a456-426614174000');
 *
 * // Get a specific user using a transaction
 * db.transaction((tx) => {
 *  return getUserById('123e4567-e89b-12d3-a456-426614174000', tx);
 *  });
 */
const getUserById = async (
  userId: string,
  db: Database = database,
): Promise<User | undefined> => {
  const records = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, userId));

  if (records.length <= 0) {
    return undefined;
  }

  return user(records[0]);
};

export default {
  getUserById,
};

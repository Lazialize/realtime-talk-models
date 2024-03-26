import { conversationSchema } from '../schemas';
import { Entity, type PartialOptional } from '../common/entity.ts';
import { uuidv7 } from 'uuidv7';

type EntityProp = typeof conversationSchema.$inferSelect;

class Conversation extends Entity<EntityProp> {}

export const conversation = (
  props: PartialOptional<EntityProp, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  const id = props.id ?? uuidv7();
  const updatedAt = props.updatedAt ?? new Date();
  const createdAt = props.createdAt ?? new Date();

  return new Conversation({
    ...props,
    id,
    updatedAt,
    createdAt,
  });
};

export type { Conversation };

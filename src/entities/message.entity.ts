import { Entity, type PartialOptional } from '../common/entity.ts';
import { messageSchema } from '../schemas';

type EntityProp = typeof messageSchema.$inferSelect;

class Message extends Entity<EntityProp> {}

export const message = (
  props: PartialOptional<EntityProp, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  const id = props.id ?? '';
  const updatedAt = props.updatedAt ?? new Date();
  const createdAt = props.createdAt ?? new Date();

  return new Message({
    ...props,
    id,
    updatedAt,
    createdAt,
  });
};

export type { Message };

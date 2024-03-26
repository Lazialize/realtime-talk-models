import { Entity, type PartialOptional } from '../common/entity.ts';
import { participantSchema } from '../schemas';
import { uuidv7 } from 'uuidv7';

type EntityProp = typeof participantSchema.$inferSelect;

class Participant extends Entity<EntityProp> {}

export const participant = (
  props: PartialOptional<EntityProp, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  const id = props.id ?? uuidv7();
  const updatedAt = props.updatedAt ?? new Date();
  const createdAt = props.createdAt ?? new Date();

  return new Participant({
    ...props,
    id,
    updatedAt,
    createdAt,
  });
};

export type { Participant };

import { Entity, type PartialOptional } from '../common/entity.ts';
import { participantSchema } from '../schemas';

type EntityProp = typeof participantSchema.$inferSelect;

class Participant extends Entity<EntityProp> {}

export const participant = (
  props: PartialOptional<EntityProp, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  const id = props.id ?? '';
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

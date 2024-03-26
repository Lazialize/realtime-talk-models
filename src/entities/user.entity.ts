import { userSchema } from '../schemas';
import { Entity, type PartialOptional } from '../common/entity.ts';

type EntityProp = typeof userSchema.$inferSelect;

class User extends Entity<EntityProp> {}

export const user = (
  props: PartialOptional<EntityProp, 'id' | 'updatedAt' | 'createdAt'>,
) => {
  const id = props.id ?? '';
  const updatedAt = props.updatedAt ?? new Date();
  const createdAt = props.createdAt ?? new Date();

  return new User({
    ...props,
    id,
    updatedAt,
    createdAt,
  });
};

export type { User };

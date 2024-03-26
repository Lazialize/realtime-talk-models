type PropType =
  | string
  | number
  | boolean
  | undefined
  | null
  | bigint
  | Date
  | PropArray;

interface PropArray extends Array<PropType> {}

type Prop = { [key: string]: PropType };

export abstract class Entity<T extends Prop> {
  constructor(private props: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.props[key];
  }
}

export type PartialOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

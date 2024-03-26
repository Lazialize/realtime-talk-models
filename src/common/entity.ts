import { json, type JsonEncodable } from './json.ts';

export type PropType = string | number | boolean | undefined | null | Date;

export type Prop = { [key: string]: PropType };

export abstract class Entity<T extends Prop> {
  constructor(private props: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.props[key];
  }

  toJSON(): JsonEncodable<T> {
    return json(this.props);
  }
}

export type PartialOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

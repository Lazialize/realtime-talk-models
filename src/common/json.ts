import type { Prop, PropType } from './entity.ts';

type JsonValue = string | number | boolean | null | JsonArray;

interface JsonArray extends Array<JsonValue> {}

export type JsonEncodable<T extends Prop> = {
  [P in keyof T]-?: T[P] extends JsonValue
    ? T[P]
    : Exclude<T[P], undefined> extends JsonValue
      ? Exclude<T[P], undefined> | null
      : T[P] extends Date
        ? string
        : T[P] extends Array<JsonValue>
          ? JsonArray
          : never;
};

export const json = <T extends Prop>(props: T): JsonEncodable<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = {};
  for (const key of Object.keys(props)) {
    const value = props[key];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    json[key] = convertPropTypeToJson(value);
  }
  return json as JsonEncodable<T>;
};

const convertPropTypeToJson = <T extends PropType>(value: T): JsonValue => {
  if (value === undefined) {
    return null;
  } else if (value instanceof Date) {
    return value.toISOString();
  } else if (Array.isArray(value)) {
    return value.map((v) => convertPropTypeToJson(v));
  } else {
    return value;
  }
};

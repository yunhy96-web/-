export const updateFieldByName = <T extends Object, K extends keyof T>(
  object: T,
  field: K,
  value: T[K]
): T => {
  const newObject = { ...object };
  newObject[field] = value;
  return newObject;
};

export const update = <T, K extends keyof T>(
  object: T,
  field: K,
  modify: (value: T) => T
): T => {
  const obj = modify(object);
  const newObject = objectSet(object, field, obj[field]);

  return newObject;
};

export const objectSet = <T, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T => {
  const copy = { ...object };
  copy[key] = value;
  return copy;
};

// type Replace<
//   S extends string,
//   From extends string,
//   To extends string
// > = S extends `${infer U}${From}${infer V}`
//   ? From extends ""
//     ? `${U}${From}${V}`
//     : `${U}${To}${V}`
//   : S;

// const aaaaa: Replace<"a From b", "From", "To"> = "a"

// console.log(aaaaa);

export const nestedUpdate = <T>(
  object: T,
  fields: (keyof T)[],
  modify: (value: T) => T
): T => {
  if (fields.length === 0) {
    return modify(object);
  }
  const newFields = [...fields];
  const field = newFields.shift();

  if (!field) {
    throw new Error("field is undefined");
  }

  return update(object, field, (value1) => {
    // 재귀 호출
    return nestedUpdate(value1, newFields, modify);
  });
};

export const map = <T, Result>(
  array: T[],
  callback: <V extends T>(value: V) => Result
): Result[] => {
  return array.map(callback);
};

export const filter = <T>(
  array: T[],
  callback: <V extends T>(value: V) => boolean
): T[] => {
  return array.filter(callback);
};

export const isSame = <T>(a: T, b: T) => {
  return a === b;
};

export const addItem = <T>(array: T[], item: T): T[] => {
  const newArray = [...array];
  newArray.push(item);

  return newArray;
};

export const deepCopy = <T extends Object>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};

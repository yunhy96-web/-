export const updateFieldByName = <T extends Object, K extends keyof T>(
  object: T,
  field: K,
  value: T[K]
): T => {
  const newObject = { ...object };
  newObject[field] = value;

  return newObject;
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

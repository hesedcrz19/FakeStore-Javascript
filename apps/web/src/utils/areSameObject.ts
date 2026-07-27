export const areSameObjects = <T extends object>(obj1: T, obj2: T) => {
  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key): boolean => {
    if (
      typeof obj1[key] === 'object' &&
      obj1[key] !== null &&
      typeof obj2[key] === 'object' &&
      obj2[key] !== null
    ) {
      return areSameObjects(obj1[key], obj2[key]);
    } else {
      return obj1[key] === obj2[key];
    }
  });
};

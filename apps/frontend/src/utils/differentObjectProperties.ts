export const differentObjectProperties = <T extends object>(obj1: T, obj2: T) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  const differentProperties: (keyof T)[] = [];

  for (const i in obj1) {
    if (
      typeof obj1[i] === 'object' &&
      obj1[i] !== null &&
      typeof obj2[i] === 'object' &&
      obj2[i] !== null
    ) {
      const difference = differentObjectProperties(obj1[i], obj2[i]);
      if (difference && difference.length) differentProperties.push(i);
    } else {
      if (obj1[i] !== obj2[i]) differentProperties.push(i);
    }
  }

  return differentProperties;
};

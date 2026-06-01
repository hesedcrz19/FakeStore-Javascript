export const differentObjectProperties = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  const differentProperties = [];

  for (const i in obj1) {
    if (obj1[i] !== obj2[i]) differentProperties.push(i);
  }

  return differentProperties;
};

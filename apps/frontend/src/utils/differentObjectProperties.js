export const differentObjectProperties = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  const differentProperties = [];

  for (const i in obj1) {
    if (typeof obj1[i] === 'object') {
      if (differentObjectProperties(obj1[i], obj2[i]).length) differentProperties.push(i);
    } else {
      if (obj1[i] !== obj2[i]) differentProperties.push(i);
    }
  }

  return differentProperties;
};

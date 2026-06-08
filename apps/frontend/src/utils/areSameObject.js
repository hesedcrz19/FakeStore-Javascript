export const areSameObjects = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const i in obj1) {
    if (typeof obj1[i] === 'object') {
      if (!areSameObjects(obj1[i], obj2[i])) return false;
    } else {
      if (obj1[i] !== obj2[i]) return false;
    }
  }

  return true;
};

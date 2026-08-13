import { describe, expect, it } from 'vitest';
import { areSameObjects } from '@/utils/areSameObject';

const object1 = {
  age: 18,
  name: 'Pepe',
  info: {
    country: 'Mexico',
  },
};
const object2 = {
  age: 18,
  name: 'Pepe',
  info: {
    country: 'Mexico',
  },
};
const object3 = {
  age: 18,
  name: 'Pepe',
  info: {
    country: 'Peru',
  },
};

describe('AreSameObject tests', () => {
  it('Should return false', () => {
    expect(areSameObjects(object1, object3)).toBe(false);
  });
  it('Should return true', () => {
    expect(areSameObjects(object1, object2)).toBe(true);
  });
});

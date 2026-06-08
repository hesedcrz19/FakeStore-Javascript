import { describe, expect, it } from 'vitest';
import { areSameObjects } from '@/utils/areSameObject';
import { differentObjectProperties } from '@/utils/differentObjectProperties';

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
const object4 = {
  age: 18,
  name: 'Pepe',
};

describe('AreSameObject tests', () => {
  it('Should return false', () => {
    expect(areSameObjects(object1, object3)).toBe(false);
  });
  it('Should return true', () => {
    expect(areSameObjects(object1, object2)).toBe(true);
  });
});

describe('Different object properties test', () => {
  it('Should return ["info"]', () => {
    expect(differentObjectProperties(object1, object3)).toStrictEqual(['info']);
  });
  it('Should return []', () => {
    expect(differentObjectProperties(object1, object2)).toHaveLength(0);
  });
  it('Should return false', () => {
    expect(differentObjectProperties(object1, object4)).toBe(false);
  });
});

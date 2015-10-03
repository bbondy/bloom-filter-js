jest.dontMock('../util');
let {toCharCodeArray, simpleHashFn, setBit, isBitSet}  = require('../util');

describe('toCharCodeArray', function() {
 it('returns an array of proper char codes', function() {
   expect(toCharCodeArray('abr')).toEqual([97, 98, 114]);
   expect(toCharCodeArray('Brian R. Bondy')).toEqual([ 66, 114, 105, 97, 110, 32, 82, 46, 32, 66, 111, 110, 100, 121 ]);
 });
});

describe('simpleHashFn', function() {
 it('generates a simple hash function for the specified prime', function() {
   let h = simpleHashFn(2);
   expect(h([0])).toBe(0);
 });
});

describe('setBit and isBitSet', function() {
 it('can set and read bits properly', function() {
   let a = new Uint8Array(10);
   // First bit in a byte
   expect(isBitSet(a, 0)).toBe(false);
   setBit(a, 0);
   expect(isBitSet(a, 0)).toBe(true);

   // Last bit in a byte
   expect(isBitSet(a, 7)).toBe(false);
   setBit(a, 7);
   expect(isBitSet(a, 7)).toBe(true);
   expect(isBitSet(a, 1)).toBe(false);
   expect(isBitSet(a, 2)).toBe(false);
   expect(isBitSet(a, 3)).toBe(false);
   expect(isBitSet(a, 4)).toBe(false);
   expect(isBitSet(a, 5)).toBe(false);
   expect(isBitSet(a, 6)).toBe(false);
   expect(isBitSet(a, 0)).toBe(true);

   // Second bit in non first byte
   expect(isBitSet(a, 9)).toBe(false);
   setBit(a, 9);
   expect(isBitSet(a, 9)).toBe(true);
   expect(isBitSet(a, 1)).toBe(false);
 });
});

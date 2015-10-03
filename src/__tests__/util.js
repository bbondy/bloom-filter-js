jest.dontMock('../util');
let {toCharCodeArray, simpleHashFn}  = require('../util');

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

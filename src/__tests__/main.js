jest.dontMock('../main')
  .dontMock('../util')
  .dontMock('crypto');

let crypto = require("crypto");

let BloomFilter = require('../main');

describe('BloomFilter', function() {
 it('Detects when an elements are in the set and not in the set', function() {
   let b = new BloomFilter();
   b.add('Brian');
   b.add('Ronald');
   b.add('Bondy');
   expect(b.exists('Brian')).toBe(true);
   expect(b.exists('Brian2')).toBe(false);
   expect(b.exists('Bria')).toBe(false);

   expect(b.exists('Ronald')).toBe(true);
   expect(b.exists('Ronald2')).toBe(false);
   expect(b.exists('onald')).toBe(false);

   expect(b.exists('Bondy')).toBe(true);
   expect(b.exists('BrianRonaldBondy')).toBe(false);
   expect(b.exists('RonaldBondy')).toBe(false);
 });

 it('can handle very long strings', function() {
   let hashFn1 = (x) => x.reduce((total, x) => total + x, 0);
   let hashFn2 = (x) => x.reduce((total, x) => (total + x) / x, 0);
   let b = new BloomFilter(10, 50000, [hashFn1, hashFn2]);
   let id1 = crypto.randomBytes(2000).toString('hex');
   let id2 = crypto.randomBytes(2000).toString('hex');
   let id3 = crypto.randomBytes(2000).toString('hex');
   b.add(id1);
   b.add(id2);
   expect(b.exists(id1)).toBe(true);
   expect(b.exists(id2)).toBe(true);
   expect(b.exists('hello')).toBe(false);
   expect(b.exists(id3)).toBe(false);
 });

 it('can return false positives for a saturated set', function() {
   let b = new BloomFilter(2, 2);
   for (let i = 0; i < 10; i++) {
     b.add(`test-${i}`);
   }
   expect(b.exists('test')).toBe(true);
 });

 it('it cannot return false negativess', function() {
   let b = new BloomFilter();
   for (let i = 0; i < 10000; i++) {
     b.add(`test-${i}`);
   }
   for (let i = 0; i < 10000; i++) {
     expect(b.exists(`test-${i}`)).toBe(true);
   }
 });
});

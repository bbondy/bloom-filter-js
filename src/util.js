export const toCharCodeArray = (str) => str.split('').map(c => c.charCodeAt(0));

/**
 * Pass in a prime for a simple rolling hash function
 */
export const simpleHashFn = (p) => (arrayValues) =>
  arrayValues.reduceRight((total, x, i) => total + x * Math.pow(p, i), 0);


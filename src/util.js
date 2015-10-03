export const toCharCodeArray = (str) => str.split('').map(c => c.charCodeAt(0));

/**
 * Pass in a prime for a simple rolling hash function
 */
export const simpleHashFn = (p) => (arrayValues) =>
  arrayValues.reduceRight((total, x, i) => total + x * Math.pow(p, i), 0);


/*
 * Sets the specific bit location
 */
export const setBit = (buffer, bitLocation) =>
  buffer[bitLocation / 8 | 0] |= 1 << bitLocation % 8;

/**
 * Returns true if the specified bit location is set
 */
export const isBitSet = (buffer, bitLocation) =>
  !!(buffer[bitLocation / 8 | 0] & 1 << bitLocation % 8);

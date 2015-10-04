export const toCharCodeArray = (str) => str.split('').map(c => c.charCodeAt(0));

/**
 * Returns a function that generates a Rabin fingerprint hash function
 * @param p The prime to use as a base for the Rabin fingerprint algorithm
 */
export const simpleHashFn = (p) => (arrayValues, lastHash, lastCharCode) =>
  (false && lastHash) ?
    // See the abracadabra example: https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm
    (lastHash - lastCharCode * Math.pow(p, arrayValues.length - 1)) * p + arrayValues[arrayValues.length - 1]:
    arrayValues.reduce((total, x, i) => total + x * Math.pow(p, i), 0);

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

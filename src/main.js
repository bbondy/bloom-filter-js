import {toCharCodeArray, simpleHashFn, isBitSet, setBit} from './util.js';

export default class BloomFilter {
  constructor(bitsPerElement = 10, estimatedNumberOfElements = 50000, hashFns) {
    if (bitsPerElement.constructor === Array) {
      // Re-order params
      let arrayLike = bitsPerElement;
      if (estimatedNumberOfElements.constructor === Array) {
        hashFns = estimatedNumberOfElements
      }
      // Calculate new buffer size
      this.bufferBitSize = arrayLike.length * 8;
      this.buffer = new Uint8Array(arrayLike);
    } else {
      // Calculate the needed buffer size in bytes
      this.bufferBitSize = bitsPerElement * estimatedNumberOfElements;
      this.buffer = new Uint8Array(Math.ceil(this.bufferBitSize / 8));
    }
    this.hashFns = hashFns || [simpleHashFn(101), simpleHashFn(103), simpleHashFn(107)];
    this.setBit = setBit.bind(this, this.buffer);
    this.isBitSet = isBitSet.bind(this, this.buffer);
  }


  /**
   * Construct a Bloom filter from a previous array of data
   * Note that the hash functions must be the same!
   */
  static from(arrayLike, hashFns) {
    return new BloomFilter(arrayLike, hashFns);
  }

  /**
   * Serializing the current BloomFilter into a JSON friendly format.
   * You would typically pass the result into JSON.stringify.
   * Note that BloomFilter.from only works if the hash functions are the same.
   */
  toJSON() {
    return Array.from(this.buffer.values())
  }

  /**
   * Print the buffer, mostly used for debugging only
   */
  print() {
    console.log(this.buffer);
  }

  /**
   * Given a string gets all the locations to check/set in the buffer
   * for that string
   */
  getLocationsForString(str) {
    let a = toCharCodeArray(str);
    return this.hashFns.map(h => h(a) % this.bufferBitSize);
  }

  /**
   * Adds he specified string to the set
   */
  add(str) {
    this.getLocationsForString(str).forEach(this.setBit);
  }

  /**
   * Returns true if the element probably exists in the set
   * Returns false if the element definitely does not exist in the set
   */
  exists(str) {
    return this.getLocationsForString(str).every(this.isBitSet);
  }
}

import {toCharCodeArray, simpleHashFn, isBitSet, setBit} from './util.js';

export default class BloomFilter {
  constructor(bitsPerElement = 10, estimatedNumberOfElements = 50000, hashFns=[simpleHashFn(101), simpleHashFn(103), simpleHashFn(107)]) {
    // Calculate the needed buffer size in bytes
    this.bufferBitSize = bitsPerElement * estimatedNumberOfElements;
    this.bufferByteSize = Math.ceil(this.bufferBitSize / 8);
    this.buffer = new Uint8Array(this.bufferByteSize);
    this.hashFns = hashFns;
    this.setBit = setBit.bind(this, this.buffer);
    this.isBitSet = isBitSet.bind(this, this.buffer);
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

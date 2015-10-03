(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.util = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var toCharCodeArray = function toCharCodeArray(str) {
    return str.split('').map(function (c) {
      return c.charCodeAt(0);
    });
  };

  exports.toCharCodeArray = toCharCodeArray;
  /**
   * Pass in a prime for a simple rolling hash function
   */
  var simpleHashFn = function simpleHashFn(p) {
    return function (arrayValues) {
      return arrayValues.reduceRight(function (total, x, i) {
        return total + x * Math.pow(p, i);
      }, 0);
    };
  };

  exports.simpleHashFn = simpleHashFn;
  /*
   * Sets the specific bit location
   */
  var setBit = function setBit(buffer, bitLocation) {
    return buffer[bitLocation / 8 | 0] |= 1 << bitLocation % 8;
  };

  exports.setBit = setBit;
  /**
   * Returns true if the specified bit location is set
   */
  var isBitSet = function isBitSet(buffer, bitLocation) {
    return !!(buffer[bitLocation / 8 | 0] & 1 << bitLocation % 8);
  };
  exports.isBitSet = isBitSet;
});
//# sourceMappingURL=util.js.map
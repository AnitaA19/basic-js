const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const countChars = (str) => {
    const map = {};
    for (const char of str) {
      map[char] = (map[char] || 0) + 1;
    }
    return map;
  };

  const freq1 = countChars(s1);
  const freq2 = countChars(s2);

  let commonCount = 0;
  for (const char in freq1) {
    if (freq2[char]) {
      commonCount += Math.min(freq1[char], freq2[char]);
    }
  }

  return commonCount;
}

module.exports = {
  getCommonCharacterCount
};

const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct; 
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    return this.process(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');
    return this.process(encryptedMessage, key, 'decrypt');
  }

  process(text, key, mode) {
    text = text.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (this.alphabet.includes(char)) {
        let textIndex = this.alphabet.indexOf(char);
        let keyChar = key[keyIndex % key.length];
        let keyIndexInAlphabet = this.alphabet.indexOf(keyChar);

        let newIndex;
        if (mode === 'encrypt') {
          newIndex = (textIndex + keyIndexInAlphabet) % 26;
        } else {
          newIndex = (textIndex - keyIndexInAlphabet + 26) % 26;
        }

        result += this.alphabet[newIndex];
        keyIndex++;
      } else {
        result += char; 
      }
    }

    return this.direct ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};

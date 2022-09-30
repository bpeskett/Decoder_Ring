// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope
  
  const alphaKey = "abcdefghijklmnopqrstuvwxyz".split("");
 
  function substitution(input, alphabet, encode = true) 
  {
    // your solution code here
    try {
      validAlphabet(alphabet);
      const codeKey = alphabet.toLowerCase().split("");
      return input
        .toLowerCase() 
        .split("") 
        .map(
          (word) =>
            encode
              ? mapTo(word, alphaKey, codeKey) // go to base alphabet to encoded alphabet
              : mapTo(word, codeKey, alphaKey) // else, we're going from coded to base
        )
        .join("");
    } catch (error) {
      return false; //if any words throw an error, return false
    }
  }

  
  function mapTo(input, fromKey, toKey) {
    if (input.match(/\s/)) return input; //if the character is a whitespace, we wish to preserve it
    const index = fromKey.indexOf(input); //finds the index of the matching character in the fromKey
    if (index === -1)
      throw new Error(`${input} not found in the provided alphabet!`); //if our alphabet doesn't contain that character, throw new Error()
    return toKey[index]; //map it out baybee
  }

  //Helper function to ensure provided alphabet is valid
  function validAlphabet(alphabet) {
    if (alphabet.length !== 26)
      throw new Error(`Alphabet must be exactly 26 characters long!`);

    if ([...new Set(alphabet)].length !== alphabet.length)
      throw new Error(`Alphabet cannot contain repeating characters!`);
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };

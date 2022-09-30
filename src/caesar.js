// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () 
{
  // you can add any code you want within this function scope
  function caesar(input, shift, encode = true) 
    {
    
      if (!shift || shift < -25 || shift > 25)// check for abnormal shift case
        {
          return false;
        }  
      
      shift *= encode ? 1 : -1; //to decode in opposite direction

      return input.toLowerCase().split("").map((character) => shifter(character, shift)).join("");//uses these methods and helper function to return the encoded or decoded message
   
    }

    function shifter(character, shift) 
      {
        const key = "abcdefghijklmnopqrstuvwxyz".split(""); //set key as alphabet where each letter is accessible

        if (!character.match(/[a-z]/)) return character; //returns character without changing it if it is not a letter 

        let index = key.indexOf(character); //uses key to get an index
        let shifted = (((index + shift) % 26) + 26) % 26; //get remainder of the sum of index and shift, add remainder, add 26
        return key[shifted];
      }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };

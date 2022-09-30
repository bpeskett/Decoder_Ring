// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () 
  {
  // you can add any code you want within this function scope
  
  const keys = {alphaKey: createKey("alpha"), coordKey: createKey("coord"),
  };


  function polybius(input, encode = true) 
    {
    
    try 
      {
      if (!input.length) throw new Error(`Input cannot be empty!`);
      return input
        .split(" ")
        .map((word) => iterateWord(word, encode, keys))
        .join(" ");
      }
      catch (error) 
      {
        return false; 
      }
    }

  //Helper function to handle iteration differences between encoding and decoding
  function iterateWord(word, encode, { alphaKey, coordKey }) 
    {
    
    if (encode)//encode
      return word
        .toLowerCase()
        .split("")
        .map((letter) => mapMatrixTo(letter, alphaKey, coordKey))
        .join("");

  
    if (word.length % 2 !== 0) //decode
      throw new Error(
        `Polybius coordinates come in pairs.\nIgnoring spaces, you cannot decrypt with an odd numbered total!`
      ); //false if word is an odd length
    
    let output = "";
    
      for (let char = 0; char < word.length; char += 2) 
      {
        const col = word[char];
        const row = word[char + 1];
        const code = `${col}${row}`;
        output += mapMatrixTo(code, coordKey, alphaKey);
      }
      return output;
    }

  
  function mapMatrixTo(input, fromKey, toKey) 
    {
      const coordinate = findCoordinate(input, fromKey); //finds the matching coordinate in the fromKey
      if (!coordinate) throw new Error(`"${input}" is not a valid input!`); //if we don't find a match in our fromKey, then return false for invalid input
      const row = coordinate[0]; 
      const col = coordinate[1]; 
      return toKey[row][col]; 
    }
  
  function findCoordinate(input, key) 
    {
    if (input === "i" || input === "j") input = "(i/j)"; //if input is i or j, then we treat it as (i/j)
    for (let row = 0; row < 5; row++)
      for (let col = 0; col < 5; col++) 
        {
        if (key[row][col] === input) return [row, col]; //
        }
    return false; //if we don't find a match, return false
    }

 
  function createKey(type = "alpha", size = 5) 
    {
    //Creates a matrix of the specified type and size to use as an encryption key
      const grid = [];
      for (let row = 0; row < size; row++)
        {
        const thisRow = [];
        for (let col = 0; col < size; col++) 
          {
          type === "alpha"
            ? thisRow.push(alphaIndex(row, col, size))
            : thisRow.push(coordIndex(row, col));
          }
        grid.push(thisRow);
        }
      return grid;
    }
  //resolves row and col into a 1d numberline, then add 97 to make it charcode lowercase alpha
  function alphaIndex(row, col, size) 
    {
      const number = row * size + col; 
      let charCode = number + 97; //Add 97 to start from charCode "a"
      if (charCode === 105) return "(i/j)"; // i and j are merged
      const shift = charCode > 105 ? 1 : 0; //if our letter comes after "i/j", shift by 1 to account for merge
      return String.fromCharCode(charCode + shift);
    }
  //resolves row and col into `${col}${row}` where both start at 1 instead of zero
  function coordIndex(row, col)
    {
      return `${col + 1}${row + 1}`;
    }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };

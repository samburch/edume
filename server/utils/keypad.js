/* 
MAIN TASK

@desc Looks for all the different letter combinations based on numeeric inputs from a keypad

User story:
As a user,
I want to create words from numbers
So that I can filter the words I want

Acceptance criteria:
Given the keypad input of 23
Then the output should be: ad, ae, af, bd, be, bf, cd, ce, cf

*/

const objectKeys = {
  1: [],
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
  0: [" "],
};

const keypad = (numericString) => {
  if (numericString.length === 0) {
    return [];
  }

  let combinations = { combinations: [""] };

  // Loop through all the numbers passed in the parameter string
  for (let i = 0; i < numericString.length; i++) {
    let key = numericString[i]; // Access current key from numericString parameter
    let letters = objectKeys[key]; // Reference the key passed in with the corresponding key in keypad object
    let tempArray = []; // Store temporary array to set combination and letters later

    // If there are any letters in the string or 1 is used, continue with nested loop
    if (letters === undefined || letters === 1) continue;

    // Loop through all the letters of every key
    for (let j = 0; j < letters.length; j++) {
      let letterToAdd = letters[j];

      // Loop through each combination and add letter to possible combination
      for (let x = 0; x < combinations["combinations"].length; x++) {
        let combination = combinations["combinations"][x];

        // Push matching letters into temporary array
        tempArray.push(combination + letterToAdd);
      }
    }
    // Store the combinations from loop into main array
    combinations = { combinations: tempArray };
  }
  // Return the matched combinations as JSON
  return (requestedKeys = JSON.parse(JSON.stringify(combinations)));
};

module.exports = keypad;

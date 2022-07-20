/*
BONUS

@desc Find suitable words from user inputs

User story:
As a user,
I want to see suitable words based on the key inputs I provided
So that I can select the right words for my message

Acceptance criteria:
Given that I have selected numbers 3446 on my phone keypad,
Then I should see the words "good" and "home" as suggested words

*/

const words = require("../models/words");

const wordmatch = (wordarray) => {
  // Initialise temporary object matching right data format
  const suitablewords = { words: [] };

  // Loop through words object which was passed into parameters
  for (let i = 0; i < wordarray["words"].length; i++) {
    // Store current word
    const currentWord = wordarray["words"][i];

    // Loop through each of the 3000 common words from imported model
    for (let j = 0; j < words.length; j++) {
      // Store current word from model
      const word = words[j];

      // Check if current word in outerloop matches with word in inner loop
      if (currentWord === word) {
        // If word matches, push it to the temporary object
        suitablewords["words"].push(word);
      }
    }
  }

  const matchedwords = JSON.parse(JSON.stringify(suitablewords));
  return matchedwords;
};

module.exports = wordmatch;

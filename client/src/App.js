import React, { useEffect, useState } from "react";
import axios from "axios";

import KeyboardComp from "./components/KeyboardComp";
import data from "./models/keyboard.json";
import "./App.css";

function App() {
  const [userkeys, setUserkeys] = useState("0"); // Stores key press state for use in keys request parameters
  const [numbers, setNumbers] = useState([]); // Stores keypad numbers as sate corresponding to which keys have been pressed
  const [combinations, setCombinations] = useState({ combinations: [] }); // Stores word combination state for matched key pad strings
  const [wordmatches, setWordmatches] = useState({ words: [] }); // Stores matched words state from initial request
  const [message, setMessage] = useState(""); // Stores text message state on phone screen

  // Temporary word query
  let wordQuery = "";

  // Function to query words from letter combinations
  const combinationsPayload = (combinations) => {
    const array = combinations["combinations"];
    let newQuery = "";

    for (let i = 0; i < array.length; i++) {
      newQuery += array[i] + "&words=";
    }

    wordQuery += newQuery;
  };
  combinationsPayload(combinations);

  // Get keypad inputs from backend
  useEffect(() => {
    axios
      .get(`/keys`, {
        params: {
          key: `${userkeys}`,
        },
      })
      .then((response) => {
        if (response.data.length === 0) return;
        setCombinations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userkeys]);

  // Get matched word using key combinations from backend
  useEffect(() => {
    axios
      .get(`/keys/words?words=${wordQuery}`)
      .then((response) => {
        setWordmatches(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [numbers, wordQuery]);

  const handleKeys = (event) => {
    event.preventDefault();

    switch (event.currentTarget.value) {
      case "delete":
        setCombinations({ combinations: [] });
        setWordmatches({ words: [] });
        return setNumbers([]);
      case "return":
        if (numbers.length === 0) return;
        return setUserkeys([...numbers]);
      default:
        setUserkeys(event.currentTarget.value);
        return setNumbers([...numbers, event.currentTarget.value]);
    }
  };

  // Create a text message interface based on selected words
  const textMessage = (event) => {
    event.preventDefault();
    setMessage([...message, event.currentTarget.innerText + " "]);
  };

  return (
    <div className="app-container">
      <div className="flex-item-1">
        <div className="phone-interface">
          <div className="phone-display">
            <p className="keyinput">{numbers}</p>
            <div className="phone-message">{message}</div>
            <div className="phone-t9-results">
              {wordmatches.words.length === 0 ? (
                <p></p>
              ) : (
                <div className="phone-words">
                  {wordmatches.words.map((match, i) => (
                    <button key={i} onClick={textMessage}>
                      {match}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="phone-keypad">
            {data &&
              data.map((keyData) => (
                <KeyboardComp
                  key={keyData.value}
                  value={keyData.value}
                  className={keyData.className}
                  handleKeys={handleKeys}
                  symbol={keyData.symbol}
                  text={keyData.text}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="flex-item-2">
        <div className="side-console">
          <h1>Console</h1>
          <h2>Instructions</h2>
            <div className="instructions">
              <ol>
                <li>Enter keys into keypad using interface</li>
                <li>Press Enter "&#9166;" key to return words</li>
                <li>Select matching word that appears create a message</li>
                <li>Select delete "&#8592;" to clear number and t9 key matches</li>
              </ol>
              <small><sup>*</sup>note: only use keypad ui and not keypresses to use the keypad</small>
            </div>
          <h4>
            <b>Example words</b>
          </h4>
          <p className="notes">
            4663: "good", "home" <br /> 2253: "bake", "cake", "able" <br />{" "}
            27753: "apple" <br /> 6666: "moon" <br /> 333363: "defend"
          </p>
          <h3>
            <b>Matching words:</b> {wordmatches.words.length}
          </h3>
          <h3>
            <b>T9 combinations:</b> {combinations.combinations.length}
          </h3>
          {combinations.combinations.length === 0 || undefined ? (
            <p></p>
          ) : (
            <ul>
              <h3>
                <b>T9 strings:</b>
              </h3>
              {combinations.combinations.map((match, i) => (
                <li key={i}>{match}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
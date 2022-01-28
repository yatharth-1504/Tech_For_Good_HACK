import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const words = [
  {
    "countries": {
      "name": [
        "afghanistan",
        "austrailia",
        "brazil",
        "canada",
        "china",
        "india"
      ],
      "clues": [
        "Taliban",
        "Country of beaches",
        "Most FiFa Wins",
        "Mini Punjab",
        "The greatwall",
        "Taj Mahal"
      ]
    }
  },
  {
    "fruits": {
      "name": [
        "apple",
        "orange",
        "banana",
        "mangoe",
        "grape"
      ]
    },
    "clues": [
      "keeps doctor away",
      "Also a Colour",
      "Minions",
      "Yellow",
      "Green"
    ]
  },
  {
    "animals": {
      "name": [
        "lion",
        "penguin",
        "pegion",
        "elephant"
      ],
      "clues": [
        "king",
        "SnowBird",
        "also a book publication",
        "Rook (Chess Reference)"
      ]
    }
  }
]

let nameIndex = Math.floor(Math.random() * words[0].countries.name.length);

function App() {
  const [Category, setCategory] = useState("");
  const [nameIndex, setnameIndex] = useState("");

  const [selectedWord, setselectedWord] = useState("");
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    setselectedWord(words[random]);
  }
  useEffect(() => {
    if (Category !== "") {
      setnameIndex(Math.floor(Math.random() * words[0].countries.name.length));
      setselectedWord(words[0][Category].name[nameIndex]);
    }

  }, [Category]);

  return (
    <>
      <Header />
      <div className="box">
        <form>
          <label>
            Select a Category:
            <select className="custom" onChange={(e) => {
              const selectedFood = e.target.value;
              setCategory(selectedFood)
            }}>
              <option value="Select">Select</option>
              <option value="countries">countries</option>
              <option value="fruits">fruits</option>
              <option value="animals">animals</option>
            </select>
            {Category} {selectedWord}
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;

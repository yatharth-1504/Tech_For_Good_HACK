import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show, checkWin } from "./helpers/helpers";

import "./App.css";

const categories = {
  Countries: {
    name: ["afghanistan", "austrailia", "brazil", "canada", "china", "india"],
    clues: [
      "Taliban",
      "Country of beaches",
      "Most FiFa Wins",
      "Mini Punjab",
      "The greatwall",
      "Taj Mahal",
    ],
  },
  Fruits: {
    name: ["apple", "orange", "banana", "mango", "grape"],
    clues: ["Keeps doctor away", "Also a Colour", "Minions", "Yellow", "Green"],
  },
  Animals: {
    name: ["lion", "penguin", "pegion", "elephant"],
    clues: [
      "King",
      "Snowbird",
      "Also a book publication",
      "Rook (Chess Reference)",
    ],
  },
  Geography: {
    name: ["elevation", "mountains","india", "china", "the Rockies","plain", "young fold", "plateau", "range", "plain", "africa"],
    clues: [
      "The mountains differ from the hills in terms of",
      "Glaciers are found in",
      "The Deccan plateau islocated in",
      "The river Yangtze flows in",
      "An important mountain range of Europe is",
      "A………… is an unbroken flat or a low-le of…………………… types of mountains",
      "………  areas are rich in mineral deposits",
      "The………… is a line of mountains",
      "The ………..  areas are most producting for farming",
      "Mt. Kilimanjaro is in",
    ],
  },
};
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(categories)[0]
  );
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedClue, setSelectedClue] = useState("");
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);
  useEffect(() => {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    const index = Math.floor(
      Math.random() * categories[selectedCategory].name.length
    );
    setSelectedWord(categories[selectedCategory].name[index]);
    setSelectedClue(categories[selectedCategory].clues[index]);
  }, [selectedCategory]);
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const index = Math.floor(
      Math.random() * categories[selectedCategory].name.length
    );
    setSelectedWord(categories[selectedCategory].name[index]);
    setSelectedClue(categories[selectedCategory].clues[index]);
  }

  return (
    <>
      <Header />
      <div className="box">
        <label>
          Select a Category:
          <select
            className="custom"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            {Object.keys(categories).map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
          <label>Clue : {selectedClue}</label>
        </label>
      </div>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;

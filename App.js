import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

const words = ["react", "javascript", "node", "html", "frontend"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export default function Hangman() {
  const [word, setWord] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const maxAttempts = 6;
  const wordArray = word.split("");
  const maskedWord = wordArray.map((letter) => (guessedLetters.includes(letter) ? letter : "_"));
  
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || wrongGuesses >= maxAttempts) return;
    
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <h1 className="text-3xl font-bold mb-4">Juego del Ahorcado</h1>
      <img 
        src={`/ahorcado/hangman${wrongGuesses}.png`} 
        alt="Ahorcado" 
        className="w-40 h-40 mb-4"
      />
      <p className="text-2xl tracking-widest mb-4">{maskedWord.join(" ")}</p>
      <p className="text-xl mb-2">Errores: {wrongGuesses} / {maxAttempts}</p>
      <div className="flex flex-wrap justify-center max-w-sm">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || wrongGuesses >= maxAttempts}
            className="m-1 p-2 border rounded bg-blue-500 text-white disabled:opacity-50"
          >
            {letter}
          </button>
        ))}
      </div>
      {(wrongGuesses >= maxAttempts || !maskedWord.includes("_")) && (
        <div className="mt-4">
          <p className="text-xl font-bold">
            {wrongGuesses >= maxAttempts ? "¡Perdiste!" : "¡Ganaste!"} La palabra era: {word}
          </p>
          <button
            onClick={resetGame}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}

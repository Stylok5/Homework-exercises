import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";

function App() {
  const [playerChoice, setPlayerChoice] = useState([]);

  const [computerChoice, setComputerChoice] = useState([]);

  function playerComputerChoices(event) {
    setPlayerChoice(event.target.innerText);
    const choices = ["Rock", "Paper", "Scissors"];
    setComputerChoice(choices[Math.floor(Math.random() * choices.length)]);
  }

  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (playerChoice === "Rock" && computerChoice === "Scissors") {
      setWinner("You win!");
      scorepIncr();
    } else if (playerChoice === "Rock" && computerChoice === "Paper") {
      setWinner("Computer wins");
      scorecIncr();
    } else if (playerChoice === "Paper" && computerChoice === "Rock") {
      setWinner("You win!");
      scorepIncr();
    } else if (playerChoice === "Paper" && computerChoice === "Scissors") {
      setWinner("Computer wins!");
      scorecIncr();
    } else if (playerChoice === "Scissors" && computerChoice === "Rock") {
      setWinner("Computer wins!");
      scorecIncr();
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
      setWinner("You win!");
      scorepIncr();
    } else if (playerChoice === computerChoice && playerChoice !== "") {
      setWinner("Tie");
    }
  }, [playerChoice, computerChoice]);

  function reset() {
    setWinner("");
    setPlayerChoice("");
    setComputerChoice("");
    setpScore(0);
    setcScore(0);
  }

  const [pScore, setpScore] = useState(0);
  const [cScore, setcScore] = useState(0);

  function scorepIncr() {
    setpScore(pScore + 1);
  }

  function scorecIncr() {
    setcScore(cScore + 1);
  }

  return (
    <Fragment>
      <h2>
        Player choice: <span>{playerChoice}</span>
      </h2>
      <h2>
        AI choice: <span>{computerChoice}</span>
      </h2>
      <h1>
        And the winner is...
        {winner}
      </h1>
      <h2>Player Score:{pScore}</h2>
      <h2>Computer Score:{cScore}</h2>
      <div>
        <button onClick={playerComputerChoices}>Rock</button>
        <button onClick={playerComputerChoices}>Paper</button>
        <button onClick={playerComputerChoices}>Scissors</button>
      </div>
      <button onClick={reset}>Reset</button>
    </Fragment>
  );
}

export default App;

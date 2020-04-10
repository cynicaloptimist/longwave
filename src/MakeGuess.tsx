import React, { useRef } from "react";
import { PlayersTeams } from "./AppState";
export function MakeGuess(props: {
  players: PlayersTeams;
  clueGiver: string;
  spectrumCard: [string, string];
  clue: string;
  playerId: string;
  submitGuess: (guess: number) => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);
  const spectrumAndClue = (
    <>
      <div>
        Spectrum: {props.spectrumCard[0]} | {props.spectrumCard[1]}
      </div>
      <div>Clue: {props.clue}</div>
    </>
  );

  const notMyTurn =
    props.playerId === props.clueGiver ||
    props.players[props.clueGiver].team !==
      props.players[props.playerId].team;
  if (notMyTurn) {
    return (
      <div>
        {spectrumAndClue}
        <div>
          Waiting for {props.players[props.clueGiver].team} team to guess...
        </div>
      </div>
    );
  }

  return (
    <div>
      {spectrumAndClue}
      <div>
        <input type="number" placeholder="Guess..." ref={inputElement} />
      </div>
      <div>
        <input
          type="button"
          value="Submit Guess"
          onClick={() => {
            if (!inputElement.current) {
              return false;
            }
            const guess = parseInt(inputElement.current.value);
            if (isNaN(guess)) {
              return false;
            }
            props.submitGuess(guess);
          }}
        />
      </div>
    </div>
  );
}

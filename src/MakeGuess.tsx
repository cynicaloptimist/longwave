import React, { useState } from "react";
import { PlayersTeams } from "./AppState";
import { Spectrum } from "./Spectrum";
export function MakeGuess(props: {
  players: PlayersTeams;
  clueGiver: string;
  spectrumCard: [string, string];
  clue: string;
  playerId: string;
  submitGuess: (guess: number) => void;
}) {
  const [handleValue, setHandleValue] = useState(0);

  const notMyTurn =
    props.playerId === props.clueGiver ||
    props.players[props.clueGiver].team !== props.players[props.playerId].team;
  if (notMyTurn) {
    return (
      <div>
        <Spectrum spectrumCard={props.spectrumCard} />
        <div>
          Waiting for {props.players[props.clueGiver].team} team to guess...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Spectrum
        spectrumCard={props.spectrumCard}
        handleValue={handleValue}
        onChange={setHandleValue}
      />
      <div>
        <input
          type="button"
          value="Submit Guess"
          onClick={() => {
            props.submitGuess(handleValue);
          }}
        />
      </div>
    </div>
  );
}

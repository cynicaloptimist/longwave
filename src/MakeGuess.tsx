import React, { useState } from "react";
import { PlayersTeams } from "./AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
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
        <CenteredColumn>
          <div>Clue: {props.clue}</div>
          <div>
            Waiting for {props.players[props.clueGiver].team} team to guess...
          </div>
        </CenteredColumn>
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
      <CenteredColumn>
        <div>Clue: {props.clue}</div>
        <div>
          <Button text="Submit Guess"
            onClick={() => {
              props.submitGuess(handleValue);
            }}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}

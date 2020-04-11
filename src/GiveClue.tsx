import React, { useRef } from "react";
import Slider from "rc-slider";

import { PlayersTeams } from "./AppState";

export function GiveClue(props: {
  players: PlayersTeams;
  spectrumCard: [string, string];
  spectrumTarget: number;
  clueGiver: string;
  playerId: string;
  submitClue: (clue: string) => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);

  if (props.playerId !== props.clueGiver) {
    const clueGiverName = props.players[props.clueGiver].name;
    return <div>Waiting for {clueGiverName} to provide a clue...</div>;
  }

  return (
    <div>
      <Slider min={1} max={21} value={props.spectrumTarget} />
      <div>
        Spectrum: {props.spectrumCard[0]} | {props.spectrumCard[1]}
      </div>
      <div>
        <input type="text" placeholder="Clue..." ref={inputElement} />
      </div>
      <div>
        <input
          type="button"
          value="Submit Clue"
          onClick={() => {
            if (!inputElement.current) {
              return false;
            }
            props.submitClue(inputElement.current.value);
          }}
        />
      </div>
    </div>
  );
}

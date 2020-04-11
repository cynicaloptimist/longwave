import React, { useRef } from "react";

import { PlayersTeams } from "./AppState";
import { Spectrum } from "./Spectrum";
import { Column } from "./LayoutElements";

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
    return (
      <div>
        <Spectrum spectrumCard={props.spectrumCard} />
        <Column>
          <div>Waiting for {clueGiverName} to provide a clue...</div>
        </Column>
      </div>
    );
  }

  return (
    <div>
      <Spectrum
        targetValue={props.spectrumTarget}
        spectrumCard={props.spectrumCard}
      />
      <Column>
        <input
          type="text"
          placeholder="Clue..."
          ref={inputElement}
          onKeyDown={(event) => {
            if (!inputElement.current) {
              return false;
            }
            if (event.key !== "Enter") {
              return true;
            }
            props.submitClue(inputElement.current.value);
          }}
        />
      </Column>
    </div>
  );
}

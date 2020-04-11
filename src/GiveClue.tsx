import React, { useRef } from "react";

import { PlayersTeams } from "./AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn } from "./LayoutElements";

export function GiveClue(props: {
  players: PlayersTeams;
  spectrumCard: [string, string];
  spectrumTarget: number;
  clueGiver: string;
  playerId: string;
  updateClueGiver: (playerId: string) => void;
  submitClue: (clue: string) => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);

  if (!props.players[props.clueGiver]) {
    props.updateClueGiver(props.playerId);
    return null;
  }

  if (props.playerId !== props.clueGiver) {
    const clueGiverName = props.players[props.clueGiver].name;
    return (
      <div>
        <Spectrum spectrumCard={props.spectrumCard} />
        <CenteredColumn>
          <div>Waiting for {clueGiverName} to provide a clue...</div>
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      <Spectrum
        targetValue={props.spectrumTarget}
        spectrumCard={props.spectrumCard}
      />
      <CenteredColumn>
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
      </CenteredColumn>
    </div>
  );
}

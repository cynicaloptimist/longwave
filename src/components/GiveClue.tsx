import React, { useRef } from "react";

import { PlayersTeams } from "../state/AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
import { useEffect } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";

export function GiveClue(props: {
  players: PlayersTeams;
  spectrumCard: [string, string];
  spectrumTarget: number;
  clueGiver: string;
  playerId: string;
  updateClueGiver: (playerId: string) => void;
  redrawCard: () => void;
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
        <Reveal>
          <Spectrum spectrumCard={props.spectrumCard} />
        </Reveal>
        <CenteredColumn>
          <div>Waiting for {clueGiverName} to provide a clue...</div>
        </CenteredColumn>
      </div>
    );
  }

  const submit = () => {
    if (!inputElement.current) {
      return false;
    }
    props.submitClue(inputElement.current.value);
  };

  return (
    <div>
      <CenteredColumn style={{ alignItems: "flex-end" }}>
        <Button text="Draw a different card" onClick={props.redrawCard} />
      </CenteredColumn>
      <Reveal>
        <Spectrum
          targetValue={props.spectrumTarget}
          spectrumCard={props.spectrumCard}
        />
      </Reveal>
      <CenteredColumn>
        <input
          type="text"
          placeholder="Clue..."
          ref={inputElement}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return true;
            }
            submit();
          }}
        />
        <Button text="Submit Clue" onClick={submit} />
      </CenteredColumn>
    </div>
  );
}

function Reveal(props: { children: React.ReactNode }) {
  const [className, setClassName] = useState("reveal");
  useEffect(() => {
    setTimeout(() => {
      return setClassName("reveal show");
    });
  });
  return <div className={className}>{props.children}</div>;
}

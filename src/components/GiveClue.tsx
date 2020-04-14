import React, { useRef } from "react";

import { RoundPhase } from "../state/AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { GameModelContext } from "../state/GameModelContext";
import { RandomSpectrumCard } from "../state/SpectrumCards";
import { RandomSpectrumTarget } from "../state/RandomSpectrumTarget";

export function GiveClue() {
  const { gameState, localPlayer, clueGiver, setGameState } = useContext(
    GameModelContext
  );
  const inputElement = useRef<HTMLInputElement>(null);

  if (!clueGiver) {
    setGameState({
      clueGiver: localPlayer.id,
    });
    return null;
  }

  if (localPlayer.id !== clueGiver.id) {
    return (
      <div>
        <Reveal>
          <Spectrum spectrumCard={gameState.spectrumCard} />
        </Reveal>
        <CenteredColumn>
          <div>Waiting for {clueGiver.name} to provide a clue...</div>
        </CenteredColumn>
      </div>
    );
  }

  const submit = () => {
    if (!inputElement.current) {
      return false;
    }

    setGameState({
      clue: inputElement.current.value,
      guess: 0,
      roundPhase: RoundPhase.MakeGuess,
    });
  };

  const redrawCard = () =>
    setGameState({
      spectrumCard: RandomSpectrumCard(),
      spectrumTarget: RandomSpectrumTarget(),
    });

  return (
    <div>
      <CenteredColumn style={{ alignItems: "flex-end" }}>
        <Button text="Draw a different card" onClick={redrawCard} />
      </CenteredColumn>
      <Reveal>
        <Spectrum
          targetValue={gameState.spectrumTarget}
          spectrumCard={gameState.spectrumCard}
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

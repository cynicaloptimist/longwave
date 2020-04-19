import React, { useRef, useContext, useState } from "react";

import { RoundPhase } from "../../state/GameState";
import { Spectrum } from "../common/Spectrum";
import { CenteredColumn, CenteredRow } from "../common/LayoutElements";
import { Button } from "../common/Button";
import { GameModelContext } from "../../state/GameModelContext";
import { RandomSpectrumTarget } from "../../state/RandomSpectrumTarget";
import { Info } from "../common/Info";
import { Animate } from "./Animate";

export function GiveClue() {
  const {
    gameState,
    localPlayer,
    clueGiver,
    spectrumCard,
    setGameState,
  } = useContext(GameModelContext);
  const inputElement = useRef<HTMLInputElement>(null);
  const [disableSubmit, setDisableSubmit] = useState(
    !inputElement.current?.value?.length
  );

  if (!clueGiver) {
    setGameState({
      clueGiver: localPlayer.id,
    });
    return null;
  }

  if (localPlayer.id !== clueGiver.id) {
    return (
      <div>
        <Animate animation="wipe-reveal-right">
          <Spectrum spectrumCard={spectrumCard} />
        </Animate>
        <CenteredColumn>
          <div>Waiting for {clueGiver.name} to provide a clue...</div>
        </CenteredColumn>
      </div>
    );
  }

  const submit = () => {
    if (!inputElement.current?.value?.length) {
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
      deckIndex: gameState.deckIndex + 1,
      spectrumTarget: RandomSpectrumTarget(),
    });

  return (
    <div>
      <CenteredColumn style={{ alignItems: "flex-end" }}>
        <Button text="Draw a different card" onClick={redrawCard} />
      </CenteredColumn>
      <Animate animation="wipe-reveal-right">
        <Spectrum
          targetValue={gameState.spectrumTarget}
          spectrumCard={spectrumCard}
        />
      </Animate>
      <CenteredColumn>
        <CenteredRow>
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
            onChange={() =>
              setDisableSubmit(!inputElement.current?.value?.length)
            }
          />
          <Info>
            <div>
              Your clue should be some concept that lies on the provided
              spectrum, conceptually located where the target is between the two
              extremes. For example, "coffee" might be a good clue that lies on
              a spectrum of "hot" to "cold".
              <ul>
                <li>Convey a single thought</li>
                <li>Stay on topic</li>
                <li>No numbers allowed</li>
                <li>Be creative!</li>
              </ul>
            </div>
          </Info>
        </CenteredRow>
        <Button text="Submit Clue" onClick={submit} disabled={disableSubmit} />
      </CenteredColumn>
    </div>
  );
}

import React, { useContext } from "react";
import { GameType, Team, RoundPhase } from "../state/AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
import { GameModelContext } from "../state/GameModelContext";

export function MakeGuess() {
  const { state: gameState, localPlayer, clueGiver, setGameState } = useContext(
    GameModelContext
  );

  if (!clueGiver) {
    return null;
  }

  const notMyTurn =
    localPlayer.id === clueGiver.id ||
    (gameState.gameType === GameType.Teams &&
      localPlayer.team !== clueGiver.team);

  let guessingTeamString = "the players";
  if (gameState.gameType === GameType.Teams) {
    guessingTeamString =
      clueGiver.team === Team.Left ? "LEFT BRAIN" : "RIGHT BRAIN";
  }

  if (notMyTurn) {
    return (
      <div>
        <Spectrum
          spectrumCard={gameState.spectrumCard}
          guessingValue={gameState.guess}
        />
        <CenteredColumn>
          <div>
            {clueGiver.name}'s clue: <strong>{gameState.clue}</strong>
          </div>
          <div>Waiting for {guessingTeamString} to guess...</div>
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      <Spectrum
        spectrumCard={gameState.spectrumCard}
        handleValue={gameState.guess}
        onChange={(guess: number) => {
          setGameState({
            guess,
          });
        }}
      />
      <CenteredColumn>
        <div>
          {clueGiver.name}'s clue: <strong>{gameState.clue}</strong>
        </div>
        <div>
          <Button
            text="Submit Guess"
            onClick={() => {
              if (gameState.gameType === GameType.Teams) {
                setGameState({
                  roundPhase: RoundPhase.CounterGuess,
                });
              } else {
                setGameState({
                  roundPhase: RoundPhase.ViewScore,
                });
              }
            }}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}

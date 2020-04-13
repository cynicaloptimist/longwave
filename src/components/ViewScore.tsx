import React from "react";
import { GetScore } from "../state/GetScore";
import { CenteredColumn } from "./LayoutElements";
import { Spectrum } from "./Spectrum";
import { Button } from "./Button";
import { GameState, GameType } from "../state/AppState";

export function ViewScore(props: {
  gameState: GameState;
  playerId: string;
  nextRound: () => void;
}) {
  const gameState = props.gameState;
  const score = GetScore(gameState.spectrumTarget, gameState.guess);
  const eligibleToDraw = () => {
    if (gameState.clueGiver === props.playerId) {
      return false;
    }

    if (gameState.gameType !== GameType.Teams) {
      return true;
    }

    const scoringTeam = gameState.players[gameState.clueGiver].team;
    if (score === 4) {
      //TODO: catchup rule
    }

    return gameState.players[props.playerId].team !== scoringTeam;
  };

  return (
    <div>
      <Spectrum
        spectrumCard={gameState.spectrumCard}
        handleValue={gameState.guess}
        targetValue={gameState.spectrumTarget}
      />
      <CenteredColumn>
        <div>Score: {score} points!</div>
        {eligibleToDraw() && (
          <div>
            <Button text="Draw next Spectrum Card" onClick={props.nextRound} />
          </div>
        )}
      </CenteredColumn>
    </div>
  );
}

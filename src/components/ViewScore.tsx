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
  const scoringTeam = gameState.players[gameState.clueGiver].team;
  const scoringTeamString = scoringTeam === "left" ? "LEFT TEAM" : "RIGHT TEAM";
  let bonusTurn = false;

  const nextTeam = (() => {
    if (gameState.gameType !== GameType.Teams) {
      return "none";
    }

    if (score === 4) {
      if (
        gameState.leftScore < gameState.rightScore &&
        scoringTeam === "left"
      ) {
        bonusTurn = true;
        return "left";
      }
      if (
        gameState.rightScore < gameState.leftScore &&
        scoringTeam === "right"
      ) {
        bonusTurn = true;
        return "right";
      }
    }

    return scoringTeam === "left" ? "right" : "left";
  })();

  const eligibleToDraw = (() => {
    if (gameState.clueGiver === props.playerId) {
      return false;
    }

    if (gameState.gameType !== GameType.Teams) {
      return true;
    }

    return gameState.players[props.playerId].team === nextTeam;
  })();

  return (
    <div>
      <Spectrum
        spectrumCard={gameState.spectrumCard}
        handleValue={gameState.guess}
        targetValue={gameState.spectrumTarget}
      />
      <CenteredColumn>
        <div>Score: {score} points!</div>
        {bonusTurn && (
          <div>Catchup activated: {scoringTeamString} takes a bonus turn!</div>
        )}
        {eligibleToDraw && (
          <Button text="Draw next Spectrum Card" onClick={props.nextRound} />
        )}
      </CenteredColumn>
    </div>
  );
}

import React from "react";
import { GetScore } from "../state/GetScore";
import { CenteredColumn } from "./LayoutElements";
import { Spectrum } from "./Spectrum";
import { Button } from "./Button";
import { GameState, GameType, Team } from "../state/AppState";

export function ViewScore(props: {
  gameState: GameState;
  playerId: string;
  nextRound: () => void;
}) {
  const gameState = props.gameState;
  const score = GetScore(gameState.spectrumTarget, gameState.guess);
  const scoringTeam = gameState.players[gameState.clueGiver].team;
  const scoringTeamString = scoringTeam === Team.Left ? "LEFT TEAM" : "RIGHT TEAM";
  let bonusTurn = false;

  const nextTeam = (() => {
    if (gameState.gameType !== GameType.Teams) {
      return Team.Unset;
    }

    if (score === 4) {
      if (
        gameState.leftScore < gameState.rightScore &&
        scoringTeam === Team.Left
      ) {
        bonusTurn = true;
        return Team.Left;
      }
      if (
        gameState.rightScore < gameState.leftScore &&
        scoringTeam === Team.Right
      ) {
        bonusTurn = true;
        return Team.Right;
      }
    }

    return scoringTeam === Team.Left ? Team.Right : Team.Left;
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

import React, { useContext } from "react";
import { GetScore } from "../state/GetScore";
import { CenteredColumn } from "./LayoutElements";
import { Spectrum } from "./Spectrum";
import { Button } from "./Button";
import { GameType, Team } from "../state/AppState";
import { GameModelContext } from "../state/GameModelContext";
import { NewRound } from "../state/NewRound";

export function ViewScore() {
  const { state: gameState, localPlayer, clueGiver, setGameState } = useContext(
    GameModelContext
  );

  if (!clueGiver) {
    return null;
  }

  const score = GetScore(gameState.spectrumTarget, gameState.guess);

  const scoringTeamString =
    clueGiver.team === Team.Left ? "LEFT TEAM" : "RIGHT TEAM";

  let bonusTurn = false;

  const nextTeam = (() => {
    if (gameState.gameType !== GameType.Teams) {
      return Team.Unset;
    }

    if (score === 4) {
      if (
        gameState.leftScore < gameState.rightScore &&
        clueGiver.team === Team.Left
      ) {
        bonusTurn = true;
        return Team.Left;
      }
      if (
        gameState.rightScore < gameState.leftScore &&
        clueGiver.team === Team.Right
      ) {
        bonusTurn = true;
        return Team.Right;
      }
    }

    return clueGiver.team === Team.Left ? Team.Right : Team.Left;
  })();

  const eligibleToDraw = (() => {
    if (clueGiver.id === localPlayer.id) {
      return false;
    }

    if (gameState.gameType !== GameType.Teams) {
      return true;
    }

    return localPlayer.team === nextTeam;
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
          <Button
            text="Draw next Spectrum Card"
            onClick={() => setGameState(NewRound(localPlayer.id))}
          />
        )}
      </CenteredColumn>
    </div>
  );
}

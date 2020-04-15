import React, { useContext } from "react";
import { GetScore } from "../state/GetScore";
import { CenteredColumn } from "./LayoutElements";
import { Spectrum } from "./Spectrum";
import { Button } from "./Button";
import { GameType, Team, InitialGameState } from "../state/AppState";
import { GameModelContext } from "../state/GameModelContext";
import { NewRound } from "../state/NewRound";

export function ViewScore() {
  const { gameState, clueGiver, spectrumCard } = useContext(GameModelContext);

  if (!clueGiver) {
    return null;
  }

  const score = GetScore(gameState.spectrumTarget, gameState.guess);

  return (
    <div>
      <Spectrum
        spectrumCard={spectrumCard}
        handleValue={gameState.guess}
        targetValue={gameState.spectrumTarget}
      />
      <CenteredColumn>
        <div>Score: {score} points!</div>
        <NextTurnOrEndGame />
      </CenteredColumn>
    </div>
  );
}

function NextTurnOrEndGame() {
  const { gameState, localPlayer, clueGiver, setGameState } = useContext(
    GameModelContext
  );

  if (!clueGiver) {
    return null;
  }

  const resetButton = (
    <Button
      text="Reset Game"
      onClick={() => {
        setGameState(InitialGameState());
      }}
    />
  );

  if (gameState.leftScore >= 10 && gameState.leftScore > gameState.rightScore) {
    return (
      <>
        <div>LEFT BRAIN wins!</div>
        {resetButton}
      </>
    );
  }

  if (
    gameState.rightScore >= 10 &&
    gameState.rightScore > gameState.leftScore
  ) {
    return (
      <>
        <div>RIGHT BRAIN wins!</div>
        {resetButton}
      </>
    );
  }

  const score = GetScore(gameState.spectrumTarget, gameState.guess);

  const scoringTeamString =
    clueGiver.team === Team.Left ? "LEFT BRAIN" : "RIGHT BRAIN";

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
    <>
      {bonusTurn && (
        <div>Catchup activated: {scoringTeamString} takes a bonus turn!</div>
      )}
      {eligibleToDraw && (
        <Button
          text="Draw next Spectrum Card"
          onClick={() => setGameState(NewRound(localPlayer.id, gameState.deckIndex))}
        />
      )}
    </>
  );
}

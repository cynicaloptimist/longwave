import React, { useContext } from "react";
import { GetScore } from "../../state/GetScore";
import { CenteredColumn, CenteredRow } from "../common/LayoutElements";
import { Spectrum } from "../common/Spectrum";
import { Button } from "../common/Button";
import {
  GameType,
  Team,
  InitialGameState,
  TeamName,
  TeamReverse,
} from "../../state/GameState";
import { GameModelContext } from "../../state/GameModelContext";
import { NewRound } from "../../state/NewRound";
import { Info } from "../common/Info";

export function ViewScore() {
  const { gameState, clueGiver, spectrumCard } = useContext(GameModelContext);

  if (!clueGiver) {
    return null;
  }

  let score = GetScore(gameState.spectrumTarget, gameState.guess);
  let bonusCoopTurn = false;
  if (gameState.gameType === GameType.Cooperative && score === 4) {
    score = 3;
    bonusCoopTurn = true;
  }

  const wasCounterGuessCorrect =
    (gameState.counterGuess === "left" &&
      gameState.spectrumTarget < gameState.guess) ||
    (gameState.counterGuess === "right" &&
      gameState.spectrumTarget > gameState.guess);

  return (
    <div>
      <Spectrum
        spectrumCard={spectrumCard}
        handleValue={gameState.guess}
        targetValue={gameState.spectrumTarget}
      />
      <CenteredColumn>
        <div>
          {clueGiver.name}'s clue: <strong>{gameState.clue}</strong>
        </div>
        <div>Score: {score} points!</div>
        {gameState.gameType === GameType.Teams && (
          <div>
            {TeamName(TeamReverse(clueGiver.team))} gets
            {wasCounterGuessCorrect
              ? " 1 point for their correct counter guess."
              : " 0 points for their counter guess."}
          </div>
        )}
        {bonusCoopTurn && (
          <div>
            Your team earned a <strong>bonus turn!</strong>
          </div>
        )}
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
        setGameState({
          ...InitialGameState(),
          deckSeed: gameState.deckSeed,
          deckIndex: gameState.deckIndex,
        });
      }}
    />
  );

  if (gameState.leftScore >= 10 && gameState.leftScore > gameState.rightScore) {
    return (
      <>
        <div>{TeamName(Team.Left)} wins!</div>
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
        <div>{TeamName(Team.Right)} wins!</div>
        {resetButton}
      </>
    );
  }

  if (
    gameState.gameType === GameType.Cooperative &&
    gameState.turnsTaken >= 7 + gameState.coopBonusTurns
  ) {
    return (
      <>
        <div>Game Complete</div>
        <div>
          Your team's final cooperative score:{" "}
          <strong>{gameState.coopScore} POINTS</strong>
        </div>
        {resetButton}
      </>
    );
  }

  const score = GetScore(gameState.spectrumTarget, gameState.guess);

  const scoringTeamString = TeamName(clueGiver.team);

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

    return TeamReverse(clueGiver.team);
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
        <CenteredRow>
          <div>Catchup activated: {scoringTeamString} takes a bonus turn! </div>
          <Info>
            After a team scores a four-point round, they get a bonus turn if
            they are still behind the other team.
          </Info>
        </CenteredRow>
      )}
      {eligibleToDraw && (
        <Button
          text="Draw next Spectrum Card"
          onClick={() => setGameState(NewRound(localPlayer.id, gameState))}
        />
      )}
    </>
  );
}

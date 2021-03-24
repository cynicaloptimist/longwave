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

import { useTranslation } from "react-i18next";

export function ViewScore() {
  const { t } = useTranslation();
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
          {t("viewscore.player_clue", { givername: clueGiver.name })}:{" "}
          <strong>{gameState.clue}</strong>
        </div>
        <div>
          {t("viewscore.score")}: {score} {t("viewscore.points")}!
        </div>
        {gameState.gameType === GameType.Teams && (
          <div>
            {TeamName(TeamReverse(clueGiver.team))} {t("viewscore.got")}
            {wasCounterGuessCorrect
              ? t("viewscore.1_point_correct_guess")
              : t("viewscore.0_point_wrong_guess")}
          </div>
        )}
        {bonusCoopTurn && <div>{t("viewscore.bonus_turn")}</div>}
        <NextTurnOrEndGame />
      </CenteredColumn>
    </div>
  );
}

function NextTurnOrEndGame() {
  const { t } = useTranslation();
  const { gameState, localPlayer, clueGiver, setGameState } = useContext(
    GameModelContext
  );

  if (!clueGiver) {
    return null;
  }

  const resetButton = (
    <Button
      text={t("viewscore.reset_game")}
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
        <div>
          {t("viewscore.winning_team", { winnerteam: TeamName(Team.Left) })}
        </div>
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
        <div>
          {t("viewscore.winning_team", { winnerteam: TeamName(Team.Right) })}
        </div>
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
        <div>{t("viewscore.game_finished")}</div>
        <div>
          {t("viewscore.final_score_team")}:{" "}
          <strong>
            {gameState.coopScore} {t("viewscore.points")}
          </strong>
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
          <div>
            {t("viewscore.catching_up", { scoringteam: scoringTeamString })}
          </div>
          <Info>{t("viewscore.catching_up_info")}</Info>
        </CenteredRow>
      )}
      {eligibleToDraw && (
        <Button
          text={t("viewscore.draw_next_card")}
          onClick={() => setGameState(NewRound(localPlayer.id, gameState))}
        />
      )}
    </>
  );
}

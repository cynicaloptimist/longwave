import React, { useContext } from "react";
import { TeamReverse, TeamName } from "../../state/GameState";
import { Spectrum } from "../common/Spectrum";
import { CenteredColumn, CenteredRow } from "../common/LayoutElements";
import { Button } from "../common/Button";
import { GameModelContext } from "../../state/GameModelContext";
import { ScoreTeamRound } from "../../state/ScoreRound";

import { useTranslation } from "react-i18next";

export function CounterGuess() {
  const { t } = useTranslation();

  const {
    gameState,
    localPlayer,
    clueGiver,
    spectrumCard,
    setGameState,
  } = useContext(GameModelContext);

  if (!clueGiver) {
    return null;
  }

  const notMyTurn = clueGiver.team === localPlayer.team;
  const counterGuessTeamString = TeamName(TeamReverse(clueGiver.team));

  if (notMyTurn) {
    return (
      <div>
        <Spectrum spectrumCard={spectrumCard} guessingValue={gameState.guess} />
        <CenteredColumn>
          <div>
            {t("counterguess.players_clue", { givername: clueGiver.name })}:{" "}
            <strong>{gameState.clue}</strong>
          </div>
          <div>
            {t("counterguess.waiting_guess_team", {
              guessteam: counterGuessTeamString,
            })}
          </div>
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      <Spectrum spectrumCard={spectrumCard} guessingValue={gameState.guess} />
      <CenteredColumn>
        <div>
          {t("counterguess.players_clue", { givername: clueGiver.name })}:{" "}
          <strong>{gameState.clue}</strong>
        </div>
      </CenteredColumn>
      <CenteredRow>
        <Button
          text={t("counterguess.more_left")}
          onClick={() =>
            setGameState(ScoreTeamRound(gameState, clueGiver.team, "left"))
          }
        />
        <Button
          text={t("counterguess.more_right")}
          onClick={() =>
            setGameState(ScoreTeamRound(gameState, clueGiver.team, "right"))
          }
        />
      </CenteredRow>
    </div>
  );
}

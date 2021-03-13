import React from "react";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { RoundPhase, Team, TeamName } from "../../state/GameState";
import { Button } from "../common/Button";
import { LongwaveAppTitle } from "../common/Title";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { NewTeamGame } from "../../state/NewGame";

import { useTranslation } from "react-i18next";

export function JoinTeam() {
  const { t } = useTranslation();
  const { gameState, localPlayer, setGameState } = useContext(GameModelContext);

  const leftTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Left
  );
  const rightTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Right
  );

  const joinTeam = (team: Team) => {
    setGameState({
      players: {
        ...gameState.players,
        [localPlayer.id]: {
          ...localPlayer,
          team,
        },
      },
    });
  };

  const startGame = () =>
    setGameState(NewTeamGame(gameState.players, localPlayer.id, gameState));

  return (
    <CenteredColumn>
      <LongwaveAppTitle />
      <div>{t("jointeam.join_team")}:</div>
      <CenteredRow
        style={{
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <CenteredColumn>
          <div>{TeamName(Team.Left)}</div>
          {leftTeam.map((playerId) => (
            <div key={playerId}>{gameState.players[playerId].name}</div>
          ))}
          <div>
            <Button
              text={t("jointeam.join_left")}
              onClick={() => joinTeam(Team.Left)}
            />
          </div>
        </CenteredColumn>
        <CenteredColumn>
          <div>{TeamName(Team.Right)}</div>
          {rightTeam.map((playerId) => (
            <div key={playerId}>{gameState.players[playerId].name}</div>
          ))}
          <div>
            <Button
              text={t("jointeam.join_right")}
              onClick={() => joinTeam(Team.Right)}
            />
          </div>
        </CenteredColumn>
      </CenteredRow>
      {gameState.roundPhase === RoundPhase.PickTeams && (
        <Button text={t("jointeam.start_game")} onClick={startGame} />
      )}
    </CenteredColumn>
  );
}

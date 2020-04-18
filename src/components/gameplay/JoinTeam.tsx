import React from "react";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { RoundPhase, Team, TeamName } from "../../state/GameState";
import { Button } from "../common/Button";
import { Title } from "../common/Title";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { NewTeamGame } from "../../state/NewGame";

export function JoinTeam() {
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
    setGameState(
      NewTeamGame(gameState.players, localPlayer.id, gameState)
    );

  return (
    <CenteredColumn>
      <Title />
      <div>Join Team:</div>
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
            <Button text="Join" onClick={() => joinTeam(Team.Left)} />
          </div>
        </CenteredColumn>
        <CenteredColumn>
          <div>{TeamName(Team.Right)}</div>
          {rightTeam.map((playerId) => (
            <div key={playerId}>{gameState.players[playerId].name}</div>
          ))}
          <div>
            <Button text="Join" onClick={() => joinTeam(Team.Right)} />
          </div>
        </CenteredColumn>
      </CenteredRow>
      {gameState.roundPhase === RoundPhase.PickTeams && (
        <Button text="Start Game" onClick={startGame} />
      )}
    </CenteredColumn>
  );
}

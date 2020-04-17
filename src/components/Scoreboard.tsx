import React, { useState, useContext } from "react";
import { GameType, Team, TeamName } from "../state/AppState";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { GameModelContext } from "../state/GameModelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export function Scoreboard() {
  const { gameState, setGameState } = useContext(GameModelContext);

  const leftTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Left
  );
  const rightTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Right
  );

  const toPlayerRow = (playerId: string) => (
    <PlayerRow
      key={playerId}
      playerName={gameState.players[playerId].name}
      onRemove={() => {
        delete gameState.players[playerId];
        setGameState(gameState);
      }}
    />
  );

  const style = {
    alignSelf: "stretch",
    alignItems: "flex-start",
    borderTop: "1px solid black",
    margin: 16,
    paddingTop: 16,
  };

  if (gameState.gameType === GameType.Freeplay) {
    return (
      <CenteredRow style={style}>
        {Object.keys(gameState.players).map(toPlayerRow)}
      </CenteredRow>
    );
  }

  return (
    <CenteredRow style={style}>
      <CenteredColumn style={{ alignItems: "flex-start" }}>
        <div>{TeamName(Team.Left)}: {gameState.leftScore} POINTS</div>
        {leftTeam.map(toPlayerRow)}
      </CenteredColumn>
      <CenteredColumn style={{ alignItems: "flex-start" }}>
        <div>{TeamName(Team.Right)}: {gameState.rightScore} POINTS</div>
        {rightTeam.map(toPlayerRow)}
      </CenteredColumn>
    </CenteredRow>
  );
}

function PlayerRow(props: { playerName: string; onRemove: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ marginLeft: 16 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {props.playerName}
      {hovered && (
        <span style={{ marginLeft: 4 }} onClick={props.onRemove}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      )}
    </div>
  );
}

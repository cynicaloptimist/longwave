import React, { useState, useContext } from "react";
import { GameType, Team, TeamName } from "../../state/GameState";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { GameModelContext } from "../../state/GameModelContext";
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
    borderTop: "1px solid black",
    margin: 16,
    paddingTop: 16,
  };

  if (gameState.gameType === GameType.Freeplay) {
    return (
      <CenteredColumn style={style}>
        <em>Free Play</em>
        <CenteredRow>
          {Object.keys(gameState.players).map(toPlayerRow)}
        </CenteredRow>
      </CenteredColumn>
    );
  }

  return (
    <CenteredRow style={style}>
      <CenteredColumn style={{ alignItems: "flex-start" }}>
        <div>
          {TeamName(Team.Left)}: {gameState.leftScore} POINTS
        </div>
        {leftTeam.map(toPlayerRow)}
      </CenteredColumn>
      <CenteredColumn style={{ alignItems: "flex-start" }}>
        <div>
          {TeamName(Team.Right)}: {gameState.rightScore} POINTS
        </div>
        {rightTeam.map(toPlayerRow)}
      </CenteredColumn>
    </CenteredRow>
  );
}

function PlayerRow(props: { playerName: string; onRemove: () => void }) {
  const [hovered, setHovered] = useState(false);
  const iconContainerStyle = {
    marginLeft: 4,
    width: 20,
  };

  return (
    <div
      style={{ marginLeft: 16, display: "flex", flexFlow: "row" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {props.playerName}
      {hovered ? (
        <div
          style={{
            ...iconContainerStyle,
            cursor: "pointer",
          }}
          onClick={props.onRemove}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      ) : (
        <div style={iconContainerStyle} />
      )}
    </div>
  );
}

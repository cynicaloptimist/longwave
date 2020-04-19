import React, { useState, useContext } from "react";
import { GameType, Team, TeamName } from "../../state/GameState";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { GameModelContext } from "../../state/GameModelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export function Scoreboard() {
  const { gameState } = useContext(GameModelContext);

  const style = {
    borderTop: "1px solid black",
    margin: 16,
    paddingTop: 16,
    alignItems: "flex-start",
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
      <TeamColumn team={Team.Left} score={gameState.leftScore} />
      <TeamColumn team={Team.Right} score={gameState.rightScore} />
    </CenteredRow>
  );
}

function TeamColumn(props: { team: Team; score: number }) {
  const { gameState } = useContext(GameModelContext);

  const members = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === props.team
  );

  return (
    <CenteredColumn style={{ alignItems: "flex-start" }}>
      <div>
        {TeamName(props.team)}: {props.score} POINTS
      </div>
      {members.map(toPlayerRow)}
    </CenteredColumn>
  );
}

function toPlayerRow(playerId: string) {
  return <PlayerRow key={playerId} playerId={playerId} />;
}

function PlayerRow(props: { playerId: string }) {
  const { gameState, setGameState } = useContext(GameModelContext);
  const player = gameState.players[props.playerId];
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
      {player.name}
      {hovered ? (
        <div
          style={{
            ...iconContainerStyle,
            cursor: "pointer",
          }}
          onClick={() => {
            delete gameState.players[props.playerId];
            setGameState(gameState);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      ) : (
        <div style={iconContainerStyle} />
      )}
    </div>
  );
}

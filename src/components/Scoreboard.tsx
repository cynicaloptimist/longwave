import React, { useState } from "react";
import { PlayersTeams, GameType } from "../state/AppState";
import { CenteredRow, CenteredColumn } from "./LayoutElements";

export function Scoreboard(props: {
  gameType: GameType;
  leftScore: number;
  rightScore: number;
  players: PlayersTeams;
  removePlayer: (playerId: string) => void;
}) {
  const leftTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "right"
  );

  const toPlayerRow = (playerId: string) => (
    <PlayerRow
      key={playerId}
      playerName={props.players[playerId].name}
      onRemove={() => props.removePlayer(playerId)}
    />
  );

  if (props.gameType === GameType.Freeplay) {
    return (
      <CenteredColumn>
        {Object.keys(props.players).map(toPlayerRow)}
      </CenteredColumn>
    );
  }

  return (
    <CenteredRow
      style={{
        alignSelf: "stretch",
        alignItems: "flex-start",
        borderTop: "1px solid black",
        margin: 16,
        paddingTop: 16,
      }}
    >
      <CenteredColumn style={{ alignItems: "flex-start" }}>
        <div>LEFT BRAIN: {props.leftScore} POINTS</div>
        {leftTeam.map(toPlayerRow)}
      </CenteredColumn>
      <CenteredColumn style={{ alignItems: "flex-start" }}>
        <div>RIGHT BRAIN: {props.rightScore} POINTS</div>
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
          [X]
        </span>
      )}
    </div>
  );
}

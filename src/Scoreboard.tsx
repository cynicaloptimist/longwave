import React from "react";
import { PlayersTeams } from "./AppState";
import { CenteredRow, CenteredColumn } from "./LayoutElements";

export function Scoreboard(props: {
  leftScore: number;
  rightScore: number;
  players: PlayersTeams;
}) {

  const leftTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "right"
  );

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
      <CenteredColumn>
        <div>LEFT BRAIN: {props.leftScore} POINTS</div>
        {leftTeam.map((playerId) => (
          <div>{props.players[playerId].name}</div>
        ))}
      </CenteredColumn>
      <CenteredColumn>
        <div>RIGHT BRAIN: {props.rightScore} POINTS</div>
        {rightTeam.map((playerId) => (
          <div>{props.players[playerId].name}</div>
        ))}
      </CenteredColumn>
    </CenteredRow>
  );
}

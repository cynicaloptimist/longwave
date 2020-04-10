import React from "react";
import { Row, Column } from "./LayoutElements";
import { PlayersTeams } from "./AppState";

export function Lobby(props: { players: PlayersTeams; startGame: () => void }) {
  const leftTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "right"
  );

  return (
    <div>
      <Row
        style={{
          alignItems: "flex-start",
        }}
      >
        <Column>
          <div>LEFT BRAIN</div>
          {leftTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
        </Column>
        <Column>
          <div>RIGHT BRAIN</div>
          {rightTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
        </Column>
      </Row>
      <input
        type="button"
        value="Start Game"
        onClick={() => {
          props.startGame();
        }}
      />
    </div>
  );
}

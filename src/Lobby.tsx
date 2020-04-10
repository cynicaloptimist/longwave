import React from "react";
import { Row, Column } from "./LayoutElements";
import { PlayersTeams } from "./AppState";

export function Lobby(props: { players: PlayersTeams; startGame: () => void }) {
  const leftTeam = Object.keys(props.players).filter(
    (playerName) => props.players[playerName].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerName) => props.players[playerName].team === "right"
  );

  return (
    <div>
      <Row>
        <Column>
          <div>LEFT BRAIN</div>
          {leftTeam.map((playerName) => (
            <div>{playerName}</div>
          ))}
        </Column>
        <Column>
          <div>RIGHT BRAIN</div>
          {rightTeam.map((playerName) => (
            <div>{playerName}</div>
          ))}
        </Column>
      </Row>
      <input
        type="button"
        value="Start Game"
        onClick={() => {
          if (leftTeam.length > 1 && rightTeam.length > 1) {
            props.startGame();
          }
        }}
      />
    </div>
  );
}

import React from "react";
import { PlayerList } from "./AppState";
import { Row, Column } from "./LayoutElements";

export function Lobby(props: {
  leftTeam: PlayerList;
  rightTeam: PlayerList;
  startGame: () => void;
}) {
  const leftTeam = Object.keys(props.leftTeam || {});
  const rightTeam = Object.keys(props.rightTeam || {});

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

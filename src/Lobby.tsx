import React from "react";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { PlayersTeams } from "./AppState";
import { Button } from "./Button";

export function Lobby(props: { players: PlayersTeams; startGame: () => void }) {
  const leftTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "right"
  );

  return (
    <div>
      <CenteredRow
        style={{
          alignItems: "flex-start",
        }}
      >
        <CenteredColumn>
          <div>LEFT BRAIN</div>
          {leftTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
        </CenteredColumn>
        <CenteredColumn>
          <div>RIGHT BRAIN</div>
          {rightTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
        </CenteredColumn>
      </CenteredRow>
      <Button text="Start Game"
        onClick={() => {
          props.startGame();
        }}
      />
    </div>
  );
}

import React from "react";
import { Row, Column } from "./LayoutElements";
import { PlayersTeams } from "./AppState";
import { Button } from "./Button";

export function JoinTeam(props: {
  players: PlayersTeams;
  joinTeam: (team: "left" | "right") => void;
}) {
  const leftTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === "right"
  );

  return (
    <div>
      <div>Join Team:</div>
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
          <div>
            <Button text="Join" onClick={() => props.joinTeam("left")} />
          </div>
        </Column>
        <Column>
          <div>RIGHT BRAIN</div>
          {rightTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
          <div>
            <Button text="Join" onClick={() => props.joinTeam("right")} />
          </div>
        </Column>
      </Row>
    </div>
  );
}

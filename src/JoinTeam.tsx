import React from "react";
import { Row, Column } from "./LayoutElements";
import { PlayersTeams } from "./AppState";

export function JoinTeam(props: {
  players: PlayersTeams;
  joinTeam: (team: "left" | "right") => void;
}) {
  const leftTeam = Object.keys(props.players).filter(
    (playerName) => props.players[playerName].team === "left"
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerName) => props.players[playerName].team === "right"
  );

  return (
    <div>
      <div>Join Team:</div>
      <Row>
        <Column>
          <div>LEFT BRAIN</div>
          {leftTeam.map((playerName) => (
            <div>{playerName}</div>
          ))}
          <div>
            <input
              type="button"
              value="Join"
              onClick={() => props.joinTeam("left")}
            />
          </div>
        </Column>
        <Column>
          <div>RIGHT BRAIN</div>
          {rightTeam.map((playerName) => (
            <div>{playerName}</div>
          ))}
          <div>
            <input
              type="button"
              value="Join"
              onClick={() => props.joinTeam("right")}
            />
          </div>
        </Column>
      </Row>
    </div>
  );
}

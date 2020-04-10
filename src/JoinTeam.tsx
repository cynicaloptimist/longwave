import React from "react";
import { PlayerList } from "./AppState";
import { Row, Column } from "./LayoutElements";

export function JoinTeam(props: {
  leftTeam: PlayerList;
  rightTeam: PlayerList;
  joinTeam: (team: "leftTeam" | "rightTeam") => void;
}) {
  return (
    <div>
      <div>Join Team:</div>
      <Row>
        <Column>
          <div>LEFT BRAIN</div>
          {Object.keys(props.leftTeam || {}).map((playerName) => (
            <div>{playerName}</div>
          ))}
          <div>
            <input
              type="button"
              value="Join"
              onClick={() => props.joinTeam("leftTeam")}
            />
          </div>
        </Column>
        <Column>
          <div>RIGHT BRAIN</div>
          {Object.keys(props.rightTeam || {}).map((playerName) => (
            <div>{playerName}</div>
          ))}
          <div>
            <input
              type="button"
              value="Join"
              onClick={() => props.joinTeam("rightTeam")}
            />
          </div>
        </Column>
      </Row>
    </div>
  );
}

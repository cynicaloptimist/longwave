import React from "react";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { PlayersTeams, RoundPhase, Team } from "../state/AppState";
import { Button } from "./Button";
import { Title } from "./Title";

export function JoinTeam(props: {
  players: PlayersTeams;
  roundPhase: RoundPhase;
  joinTeam: (team: Team) => void;
  startGame: () => void;
}) {
  const leftTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === Team.Left
  );
  const rightTeam = Object.keys(props.players).filter(
    (playerId) => props.players[playerId].team === Team.Right
  );

  return (
    <CenteredColumn>
      <Title />
      <div>Join Team:</div>
      <CenteredRow
        style={{
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <CenteredColumn>
          <div>LEFT BRAIN</div>
          {leftTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
          <div>
            <Button text="Join" onClick={() => props.joinTeam(Team.Left)} />
          </div>
        </CenteredColumn>
        <CenteredColumn>
          <div>RIGHT BRAIN</div>
          {rightTeam.map((playerId) => (
            <div>{props.players[playerId].name}</div>
          ))}
          <div>
            <Button text="Join" onClick={() => props.joinTeam(Team.Right)} />
          </div>
        </CenteredColumn>
      </CenteredRow>
      {props.roundPhase === RoundPhase.PickTeams && (
        <Button text="Start Game" onClick={props.startGame} />
      )}
    </CenteredColumn>
  );
}

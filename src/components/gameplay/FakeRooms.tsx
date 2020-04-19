import React, { useState } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { ActiveGame } from "./ActiveGame";
import { BuildGameModel } from "../../state/BuildGameModel";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import {
  InitialGameState,
  GameState,
  Team,
  GameType,
  RoundPhase,
} from "../../state/GameState";

export function FakeRooms() {
  const [gameState, setGameState] = useState<GameState>({
    ...InitialGameState(),
    gameType: GameType.Teams,
    roundPhase: RoundPhase.PickTeams,
    players: {
      ul: {
        name: "Upper Left",
        team: Team.Left,
      },
      ll: {
        name: "Lower Left",
        team: Team.Left,
      },
      ur: {
        name: "Upper Right",
        team: Team.Right,
      },
      lr: {
        name: "Lower Right",
        team: Team.Right,
      },
    },
  });

  const setPartialGameState = (newState: Partial<GameState>) =>
    setGameState({
      ...gameState,
      ...newState,
    });

  const style: React.CSSProperties = {
    width: 500,
    margin: 4,
    padding: 4,
    border: "1px solid black",
  };

  const renderGame = (playerId: string) => (
    <div style={style}>
      <GameModelContext.Provider
        value={BuildGameModel(gameState, setPartialGameState, playerId)}
      >
        <ActiveGame />
      </GameModelContext.Provider>
    </div>
  );

  return (
    <CenteredRow
      style={{ alignItems: "stretch", position: "absolute", top: 100, left: 0 }}
    >
      <CenteredColumn
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {renderGame("ul")}
        {renderGame("ll")}
      </CenteredColumn>
      <CenteredColumn
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {renderGame("ur")}
        {renderGame("lr")}
      </CenteredColumn>
    </CenteredRow>
  );
}

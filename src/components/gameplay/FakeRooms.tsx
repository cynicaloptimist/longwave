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
import { useStorageBackedState } from "../hooks/useStorageBackedState";

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
    alignItems: "stretch",
  };

  return (
    <CenteredRow>
      <CenteredColumn style={style}>
        <GameModelContext.Provider
          value={BuildGameModel(gameState, setPartialGameState, "ul")}
        >
          <ActiveGame />
        </GameModelContext.Provider>
        <GameModelContext.Provider
          value={BuildGameModel(gameState, setPartialGameState, "ll")}
        >
          <ActiveGame />
        </GameModelContext.Provider>
      </CenteredColumn>
      <CenteredColumn style={style}>
        <GameModelContext.Provider
          value={BuildGameModel(gameState, setPartialGameState, "ur")}
        >
          <ActiveGame />
        </GameModelContext.Provider>
        <GameModelContext.Provider
          value={BuildGameModel(gameState, setPartialGameState, "lr")}
        >
          <ActiveGame />
        </GameModelContext.Provider>
      </CenteredColumn>
    </CenteredRow>
  );
}

import React from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { ActiveGame } from "./ActiveGame";
import { BuildGameModel } from "../../state/BuildGameModel";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { InitialGameState, GameState, Team } from "../../state/GameState";
import { useStorageBackedState } from "../hooks/useStorageBackedState";

export function FakeRooms() {
  const [gameState, setGameState] = useStorageBackedState<GameState>(
    {
      ...InitialGameState(),
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
    },
    "fakeGame"
  );

  const setPartialGameState = (newState: Partial<GameState>) =>
    setGameState({
      ...InitialGameState(),
      ...newState,
    });

  return (
    <CenteredRow>
      <CenteredColumn>
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
      <CenteredColumn>
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

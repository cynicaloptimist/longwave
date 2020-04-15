import React from "react";
import { render } from "@testing-library/react";
import { ViewScore } from "./ViewScore";
import { InitialGameState, Team } from "../state/AppState";
import { useGameModel } from "./useGameModel";
import { GameModelContext } from "../state/GameModelContext";

test("Applies catchup rule", () => {
  const gameState = {
    ...InitialGameState(),
    players: {
      playerId: {
        name: "Player",
        team: Team.Left,
      },
      teammateId: {
        name: "Teammate",
        team: Team.Left,
      },
    },
    leftScore: 0,
    rightScore: 4,
    clueGiver: "teammateId",
    spectrumTarget: 1,
    guess: 1,
  };

  const component = render(
    <GameModelContext.Provider
      value={useGameModel(gameState, jest.fn(), "playerId")}
    >
      <ViewScore />
    </GameModelContext.Provider>
  );

  const bonusTurn = component.getByText(
    "Catchup activated: LEFT BRAIN takes a bonus turn!"
  );
  expect(bonusTurn).toBeInTheDocument();
});

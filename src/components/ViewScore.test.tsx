import React from "react";
import { render } from "@testing-library/react";
import { ViewScore } from "./ViewScore";
import { InitialGameState, Team } from "../state/AppState";
import { BuildGameModel } from "../state/BuildGameModel";
import { GameModelContext } from "../state/GameModelContext";

const onePlayerGame = {
  ...InitialGameState(),
  players: {
    playerId: {
      name: "Player",
      team: Team.Left,
    },
  },
  clueGiver: "playerId",
};

test("Applies 4 points for a perfect guess", () => {
  const gameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 1,
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "playerId")}
    >
      <ViewScore />
    </GameModelContext.Provider>
  );

  const bonusTurn = component.getByText("Score: 4 points!");
  expect(bonusTurn).toBeInTheDocument();
});

test("Applies 2 points for off by 2", () => {
  const gameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 3,
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "playerId")}
    >
      <ViewScore />
    </GameModelContext.Provider>
  );

  const bonusTurn = component.getByText("Score: 2 points!");
  expect(bonusTurn).toBeInTheDocument();
});

test("Applies 0 points for off by 3", () => {
  const gameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 4,
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "playerId")}
    >
      <ViewScore />
    </GameModelContext.Provider>
  );

  const bonusTurn = component.getByText("Score: 0 points!");
  expect(bonusTurn).toBeInTheDocument();
});

test("Applies catchup rule", () => {
  const gameState = {
    ...InitialGameState(),
    players: {
      playerId: {
        name: "Player",
        team: Team.Left,
      },
    },
    leftScore: 0,
    rightScore: 4,
    clueGiver: "playerId",
    spectrumTarget: 1,
    guess: 1,
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "playerId")}
    >
      <ViewScore />
    </GameModelContext.Provider>
  );

  const bonusTurn = component.getByText(
    "Catchup activated: LEFT BRAIN takes a bonus turn!"
  );
  expect(bonusTurn).toBeInTheDocument();
});

import { GameState, InitialGameState, Team } from "../../state/GameState";
import { GameModelContext } from "../../state/GameModelContext";
import { BuildGameModel } from "../../state/BuildGameModel";
import { MakeGuess } from "./MakeGuess";
import React from "react";
import { render } from "@testing-library/react";

const helpText = "LAde weitere Spieler in das Spiel ein.";
test("Should show help text when more players are needed", () => {
  const gameState: GameState = {
    ...InitialGameState(),
    players: {
      player1: {
        name: "Spieler 1",
        team: Team.Left,
      },
    },
    clueGiver: "player1",
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "player1")}
    >
      <MakeGuess />
    </GameModelContext.Provider>
  );

  const subject = component.queryByText(helpText);
  expect(subject).toBeInTheDocument();
});

test("Should show help text when more players are needed", () => {
  const gameState: GameState = {
    ...InitialGameState(),
    players: {
      player1: {
        name: "Spieler 1",
        team: Team.Left,
      },
      player2: {
        name: "Spieler 2",
        team: Team.Left,
      },
    },
    clueGiver: "player1",
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "player1")}
    >
      <MakeGuess />
    </GameModelContext.Provider>
  );

  const subject = component.queryByText(helpText);
  expect(subject).not.toBeInTheDocument();
});

test("Should show button to submit your team's guess", () => {
  const gameState: GameState = {
    ...InitialGameState(),
    players: {
      player1: {
        name: "Spieler 1",
        team: Team.Left,
      },
      player2: {
        name: "Spieler 2",
        team: Team.Left,
      },
    },
    clueGiver: "player2",
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "player1")}
    >
      <MakeGuess />
    </GameModelContext.Provider>
  );

  const subject = component.getByText("Rateversuch für LINKES GEHIRN");

  expect(subject).toBeInTheDocument();
});

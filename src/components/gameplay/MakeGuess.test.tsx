import { GameState, InitialGameState, Team } from "../../state/GameState";
import { GameModelContext } from "../../state/GameModelContext";
import { BuildGameModel } from "../../state/BuildGameModel";
import { MakeGuess } from "./MakeGuess";
import React from "react";
import { render } from "@testing-library/react";

test("Should show button to submit your team's guess", () => {
  const gameState: GameState = {
    ...InitialGameState(),
    players: {
      player1: {
        name: "Player 1",
        team: Team.Left,
      },
      player2: {
        name: "Player 2",
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

  const subject = component.getByText("Submit Guess for LEFT BRAIN");

  expect(subject).toBeInTheDocument();
});

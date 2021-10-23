import { GameState, InitialGameState, Team } from "../../state/GameState";
import { GameModelContext } from "../../state/GameModelContext";
import { BuildGameModel } from "../../state/BuildGameModel";
import { MakeGuess } from "./MakeGuess";
import { render } from "@testing-library/react";

const tSingleCardDeck = () => [["left", "right"]];

test("Should show help text when more players are needed", () => {
  const gameState: GameState = {
    ...InitialGameState(),
    players: {
      player1: {
        name: "Player 1",
        team: Team.Left,
      },
    },
    clueGiver: "player1",
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "player1", tSingleCardDeck)}
    >
      <MakeGuess />
    </GameModelContext.Provider>
  );

  const subject = component.queryByText("makeguess.invite_other_players");
  expect(subject).toBeInTheDocument();
});

test("Should show help text when more players are needed", () => {
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
    clueGiver: "player1",
  };

  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, jest.fn(), "player1", tSingleCardDeck)}
    >
      <MakeGuess />
    </GameModelContext.Provider>
  );

  const subject = component.queryByText("invite_other_players");
  expect(subject).not.toBeInTheDocument();
});

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
      value={BuildGameModel(gameState, jest.fn(), "player1", tSingleCardDeck)}
    >
      <MakeGuess />
    </GameModelContext.Provider>
  );

  const subject = component.getByText("makeguess.guess_for_team");

  expect(subject).toBeInTheDocument();
});

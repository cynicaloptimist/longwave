import { GameState, InitialGameState, Team } from "../../state/GameState";
import { MakeGuess } from "./MakeGuess";
import { render } from "@testing-library/react";
import { TestContext } from "./TestContext";

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
    <TestContext gameState={gameState} playerId="player1">
      <MakeGuess />
    </TestContext>
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
    <TestContext gameState={gameState} playerId="player1">
      <MakeGuess />
    </TestContext>
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
    <TestContext gameState={gameState} playerId="player1">
      <MakeGuess />
    </TestContext>
  );

  const subject = component.getByText("makeguess.guess_for_team");

  expect(subject).toBeInTheDocument();
});

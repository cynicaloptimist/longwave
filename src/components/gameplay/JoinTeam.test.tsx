import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { GameModelContext } from "../../state/GameModelContext";
import { BuildGameModel } from "../../state/BuildGameModel";
import { InitialGameState, GameState, Team } from "../../state/GameState";
import { JoinTeam } from "./JoinTeam";

test("Assigns player to the selected team", () => {
  const gameState: GameState = {
    ...InitialGameState(),
    players: {
      playerId: {
        name: "Player",
        team: Team.Unset,
      },
    },
  };

  const setState = jest.fn();
  const component = render(
    <GameModelContext.Provider
      value={BuildGameModel(gameState, setState, "playerId")}
    >
      <JoinTeam />
    </GameModelContext.Provider>
  );

  const button = component
    .getByText("LEFT BRAIN")
    .parentNode?.querySelector("input")!;
  expect(button.value).toEqual("Join");
  fireEvent.click(button);

  expect(setState).toHaveBeenCalledWith({
    players: {
      playerId: {
        id: "playerId",
        name: "Player",
        team: Team.Left,
      },
    },
  });
});

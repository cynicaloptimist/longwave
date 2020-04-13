import React from "react";
import { render } from "@testing-library/react";
import { ViewScore } from "./ViewScore";
import { InitialGameState } from "../state/AppState";

test("Applies catchup rule", () => {
  const component = render(
    <ViewScore
      gameState={{
        ...InitialGameState(),
        players: {
          playerId: {
            name: "Player",
            team: "left",
          },
          teammateId: {
            name: "Teammate",
            team: "left",
          },
        },
        leftScore: 0,
        rightScore: 4,
        clueGiver: "teammateId",
        spectrumTarget: 1,
        guess: 1,
      }}
      playerId={"playerId"}
      nextRound={jest.fn()}
    />
  );

  const bonusTurn = component.getByText(
    "Catchup activated: LEFT TEAM takes a bonus turn!"
  );
  expect(bonusTurn).toBeInTheDocument();
});

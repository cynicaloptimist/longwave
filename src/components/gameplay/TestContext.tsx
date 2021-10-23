import { ReactChild } from "react";
import { GameState } from "../../state/GameState";
import { BuildGameModel } from "../../state/BuildGameModel";
import { GameModelContext } from "../../state/GameModelContext";

export function TestContext(props: {
  gameState: GameState;
  playerId: string;
  children: ReactChild;
}) {
  return (
    <GameModelContext.Provider
      value={BuildGameModel(props.gameState, jest.fn(), props.playerId, () => [
        "left",
        "right",
      ])}
    >
      {props.children}
    </GameModelContext.Provider>
  );
}

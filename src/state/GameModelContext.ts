import { Team, InitialGameState } from "./GameState";
import { createContext } from "react";
import { GameModel } from "./BuildGameModel";

export const GameModelContext = createContext<GameModel>({
  gameState: InitialGameState(),
  localPlayer: {
    id: "localPlayer",
    name: "Player",
    team: Team.Unset,
  },
  clueGiver: null,
  spectrumCard: ["left", "right"],
  setGameState: () => {},
});

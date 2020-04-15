import { GameState, Team } from "../state/AppState";
import { useMemo } from "react";
import { AllCards } from "../state/SpectrumCards";
const shuffleSeed: {
  shuffle: <T>(arr: T[], seed: string) => T[];
} = require("shuffle-seed");

type Player = {
  id: string;
  name: string;
  team: Team;
};

export interface GameModel {
  gameState: GameState;
  localPlayer: Player;
  clueGiver: Player | null;
  spectrumCard: [string, string];
  setGameState: (newState: Partial<GameState>) => void;
}

export function useGameModel(
  gameState: GameState,
  setGameState: (newState: Partial<GameState>) => void,
  localPlayerId: string
): GameModel {
  const clueGiver = gameState.players[gameState.clueGiver]
    ? {
        ...gameState.players[gameState.clueGiver],
        id: gameState.clueGiver,
      }
    : null;

  const spectrumDeck = useMemo(
    () => shuffleSeed.shuffle(AllCards, gameState.deckSeed),
    [gameState.deckSeed]
  );

  return {
    gameState,
    localPlayer: { ...gameState.players[localPlayerId], id: localPlayerId },
    clueGiver,
    spectrumCard: spectrumDeck[gameState.deckIndex % spectrumDeck.length],
    setGameState,
  };
}

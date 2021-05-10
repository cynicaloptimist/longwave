import { GameState, Team } from "./GameState";
import memoize from "lodash/memoize";
//import { AllCards } from "./SpectrumCards";  // original line of code
import { AllCards } from "./SpectrumCards-en"; // new default for english language
//import { AllCards } from "./SpectrumCards-de";   // german translation
//import { AllCards } from "./SpectrumCards-fr";   // French translation
//import { AllCards } from "./SpectrumCards-pt-br";   // pt-br translation

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

const getSeededDeck = memoize((seed: string, cards: [string, string][]) =>
  shuffleSeed.shuffle(cards, seed)
);

export function BuildGameModel(
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

  const spectrumDeck = getSeededDeck(gameState.deckSeed, AllCards);

  return {
    gameState,
    localPlayer: { ...gameState.players[localPlayerId], id: localPlayerId },
    clueGiver,
    spectrumCard: spectrumDeck[gameState.deckIndex % spectrumDeck.length],
    setGameState,
  };
}

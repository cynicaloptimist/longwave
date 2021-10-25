import { GameState, Team } from "./GameState";
import memoize from "lodash/memoize";
import { TFunction } from "react-i18next";

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
  setPlayerName: (newName: string) => void;
}

const getSeededDeck = memoize((seed: string, cards: [string, string][]) =>
  shuffleSeed.shuffle(cards, seed)
);

export function BuildGameModel(
  gameState: GameState,
  setGameState: (newState: Partial<GameState>) => void,
  localPlayerId: string,
  tSpectrumCards: TFunction<"spectrum-cards">,
  setPlayerName: (newName: string) => void
): GameModel {
  const clueGiver = gameState.players[gameState.clueGiver]
    ? {
        ...gameState.players[gameState.clueGiver],
        id: gameState.clueGiver,
      }
    : null;

  type SpectrumCard = [string, string];
  const basicCards = tSpectrumCards("basic", {
    returnObjects: true,
  }) as SpectrumCard[];
  const advancedCards = tSpectrumCards("advanced", {
    returnObjects: true,
  }) as SpectrumCard[];
  const AllCards = [...basicCards, ...advancedCards];
  const spectrumDeck = getSeededDeck(gameState.deckSeed, AllCards);

  return {
    gameState,
    localPlayer: {
      ...gameState.players[localPlayerId],
      id: localPlayerId,
    },
    clueGiver,
    spectrumCard: spectrumDeck[gameState.deckIndex % spectrumDeck.length],
    setGameState,
    setPlayerName,
  };
}

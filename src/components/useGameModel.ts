import { GameState, Team } from "../state/AppState";

type Player = {
  id: string;
  name: string;
  team: Team;
};

export interface GameModel {
  gameState: GameState;
  localPlayer: Player;
  clueGiver: Player | null;
  setGameState: (newState: Partial<GameState>) => void;
}

export function useGameModel(
  gameState: GameState,
  setGameState: (newState: Partial<GameState>) => void,
  localPlayerId: string
) {
  const clueGiver = gameState.players[gameState.clueGiver]
    ? {
        ...gameState.players[gameState.clueGiver],
        id: gameState.clueGiver,
      }
    : null;
  return {
    gameState,
    localPlayer: { ...gameState.players[localPlayerId], id: localPlayerId },
    clueGiver,
    setGameState,
  };
}

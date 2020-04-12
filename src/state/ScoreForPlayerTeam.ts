import { GameState } from "./AppState";

export function ScoreForPlayerTeam(
  gameState: GameState,
  playerId: string,
  pointsScored: number
): Partial<GameState> {
  if (gameState.players[playerId].team === "left") {
    return {
      leftScore: gameState.leftScore + pointsScored,
    };
  }
  if (gameState.players[playerId].team === "right") {
    return {
      rightScore: gameState.rightScore + pointsScored,
    };
  }
  return {};
}

import { GameState, RoundPhase } from "./AppState";
import { GetScore } from "./GetScore";

export function ScoreRound(
  gameState: GameState,
  counterGuessingPlayer: string,
  counterGuess: "left" | "right"
): Partial<GameState> {
  const pointsScored = GetScore(gameState.spectrumTarget, gameState.guess);
  const correctCounterGuess =
    (counterGuess === "left" && gameState.guess < gameState.spectrumTarget) ||
    (counterGuess === "right" && gameState.guess > gameState.spectrumTarget);

  let finalState: Partial<GameState> = {
    roundPhase: RoundPhase.ViewScore,
  };

  if (gameState.players[counterGuessingPlayer].team === "left") {
    finalState.leftScore = gameState.leftScore + (correctCounterGuess ? 1 : 0);
    finalState.rightScore = gameState.rightScore + pointsScored;
  }

  if (gameState.players[counterGuessingPlayer].team === "right") {
    finalState.rightScore = gameState.rightScore + (correctCounterGuess ? 1 : 0);
    finalState.leftScore = gameState.leftScore + pointsScored;
  }

  return finalState;
}

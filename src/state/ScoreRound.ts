import { GameState, RoundPhase, Team } from "./AppState";
import { GetScore } from "./GetScore";

export function ScoreRound(
  gameState: GameState,
  guessingTeam: Team,
  counterGuess: "left" | "right"
): Partial<GameState> {
  const pointsScored = GetScore(gameState.spectrumTarget, gameState.guess);
  const wasCounterGuessCorrect =
    (counterGuess === "left" && gameState.spectrumTarget < gameState.guess) ||
    (counterGuess === "right" && gameState.spectrumTarget > gameState.guess);

  let finalState: Partial<GameState> = {
    roundPhase: RoundPhase.ViewScore,
    counterGuess,
  };

  if (guessingTeam === Team.Right) {
    finalState.rightScore = gameState.rightScore + pointsScored;
    finalState.leftScore =
      gameState.leftScore + (wasCounterGuessCorrect ? 1 : 0);
  }

  if (guessingTeam === Team.Left) {
    finalState.leftScore = gameState.leftScore + pointsScored;
    finalState.rightScore =
      gameState.rightScore + (wasCounterGuessCorrect ? 1 : 0);
  }

  return finalState;
}

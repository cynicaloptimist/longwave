import { GameState, RoundPhase, Team } from "./AppState";
import { GetScore } from "./GetScore";

export function ScoreRound(
  gameState: GameState,
  counterGuessingPlayer: string,
  counterGuess: "left" | "right"
): Partial<GameState> {
  const pointsScored = GetScore(gameState.spectrumTarget, gameState.guess);
  const correctCounterGuess =
    (counterGuess === "left" && gameState.spectrumTarget < gameState.guess) ||
    (counterGuess === "right" && gameState.spectrumTarget > gameState.guess);

  const counterGuessingTeam =
    gameState.players[counterGuessingPlayer]?.team || Team.Unset;

  let finalState: Partial<GameState> = {
    roundPhase: RoundPhase.ViewScore,
  };

  if (counterGuessingTeam === Team.Left) {
    finalState.leftScore = gameState.leftScore + (correctCounterGuess ? 1 : 0);
    finalState.rightScore = gameState.rightScore + pointsScored;
  }

  if (counterGuessingTeam === Team.Right) {
    finalState.rightScore =
      gameState.rightScore + (correctCounterGuess ? 1 : 0);
    finalState.leftScore = gameState.leftScore + pointsScored;
  }

  return finalState;
}

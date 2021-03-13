import { GameState, RoundPhase, Team } from "./GameState";
import { GetScore } from "./GetScore";

export function ScoreCoopRound(gameState: GameState): Partial<GameState> {
  const effectivePointsScored = GetScore(
    gameState.spectrumTarget,
    gameState.guess
  );
  let finalState: Partial<GameState> = {
    roundPhase: RoundPhase.ViewScore,
  };

  if (effectivePointsScored === 4) {
    finalState.coopScore = gameState.coopScore + 3;
    finalState.coopBonusTurns = gameState.coopBonusTurns + 1;
  } else {
    finalState.coopScore = gameState.coopScore + effectivePointsScored;
  }

  return finalState;
}

export function ScoreTeamRound(
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

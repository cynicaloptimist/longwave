import { RoundPhase, GameState } from "./GameState";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";
import { BuildGameModel } from "./BuildGameModel";
import { TFunction } from "react-i18next";

export function NewRound(
  playerId: string,
  gameState: GameState,
  tSpectrumCards: TFunction<"spectrum-cards">
): Partial<GameState> {
  const gameModel = BuildGameModel(
    gameState,
    () => {},
    playerId,
    tSpectrumCards
  );

  const newState: Partial<GameState> = {
    clueGiver: playerId,
    roundPhase: RoundPhase.GiveClue,
    deckIndex: gameState.deckIndex + 1,
    turnsTaken: gameState.turnsTaken + 1,
    spectrumTarget: RandomSpectrumTarget(),
  };

  if (gameModel.clueGiver !== null) {
    newState.previousTurn = {
      spectrumCard: gameModel.spectrumCard,
      spectrumTarget: gameState.spectrumTarget,
      clueGiverName: gameModel.clueGiver.name,
      clue: gameState.clue,
      guess: gameState.guess,
    };
  }

  return newState;
}

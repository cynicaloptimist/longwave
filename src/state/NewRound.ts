import { RoundPhase, GameState } from "./GameState";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";

export function NewRound(playerId: string, deckIndex: number): Partial<GameState> {
  return {
    clueGiver: playerId,
    roundPhase: RoundPhase.GiveClue,
    deckIndex: deckIndex + 1,
    spectrumTarget: RandomSpectrumTarget(),
  };
}

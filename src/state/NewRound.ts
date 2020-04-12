import { RoundPhase, GameState } from "./AppState";
import { RandomSpectrumCard } from "./SpectrumCards";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";

export function NewRound(playerId: string): Partial<GameState> {
  return {
    clueGiver: playerId,
    roundPhase: RoundPhase.GiveClue,
    spectrumCard: RandomSpectrumCard(),
    spectrumTarget: RandomSpectrumTarget(),
  };
}

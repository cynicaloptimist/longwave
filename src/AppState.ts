import { RandomSpectrumCard } from "./SpectrumCards";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";

export interface AppState {
  roomId: string;
}

export enum RoundPhase {
  GiveClue,
  MakeGuess,
  ViewScore
}

export interface GameState {
  roundPhase: RoundPhase;
  spectrumCard: [string, string];
  spectrumTarget: number;
  clue: string;
  guess: number;
}

export function InitialGameState(): GameState {
  return {
    roundPhase: RoundPhase.GiveClue,
    spectrumCard: RandomSpectrumCard(),
    spectrumTarget: RandomSpectrumTarget(),
    clue: "",
    guess: 0
  }
}

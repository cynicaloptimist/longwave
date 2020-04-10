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

export type PlayerList = {
  [playerName: string]: true
} | undefined

export interface GameState {
  roundPhase: RoundPhase;
  spectrumCard: [string, string];
  spectrumTarget: number;
  clue: string;
  guess: number;
  players: PlayerList;
  leftTeam: PlayerList;
  rightTeam: PlayerList;
  clueGiver: string;
}

export function InitialGameState(): GameState {
  return {
    roundPhase: RoundPhase.GiveClue,
    spectrumCard: RandomSpectrumCard(),
    spectrumTarget: RandomSpectrumTarget(),
    clue: "",
    guess: 0,
    players: {},
    leftTeam: {},
    rightTeam: {},
    clueGiver: ""
  }
}

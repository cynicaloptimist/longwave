export interface AppState {
  roomId: string;
}

export interface GameState {
  increment: number;
}

export enum RoundPhase {
  GiveClue,
  MakeGuess,
  ViewScore
}
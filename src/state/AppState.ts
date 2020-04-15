import { RandomSpectrumTarget } from "./RandomSpectrumTarget";
import { RandomFourCharacterString } from "./RandomFourCharacterString";

export interface AppState {
  roomId: string;
}

export enum RoundPhase {
  SetupGame,
  PickTeams,
  GiveClue,
  MakeGuess,
  CounterGuess,
  ViewScore,
}

export enum GameType {
  Teams,
  Cooperative,
  Freeplay,
}

export enum Team {
  Unset,
  Left,
  Right,
}

export type PlayersTeams = {
  [playerId: string]: {
    name: string;
    team: Team;
  };
};

export interface GameState {
  gameType: GameType;
  roundPhase: RoundPhase;
  deckSeed: string;
  deckIndex: number;
  spectrumTarget: number;
  clue: string;
  guess: number;
  players: PlayersTeams;
  clueGiver: string;
  leftScore: number;
  rightScore: number;
}

export function InitialGameState(): GameState {
  return {
    gameType: GameType.Teams,
    roundPhase: RoundPhase.SetupGame,
    deckSeed: RandomFourCharacterString(),
    deckIndex: 0,
    spectrumTarget: RandomSpectrumTarget(),
    clue: "",
    guess: 0,
    players: {},
    clueGiver: "",
    leftScore: 0,
    rightScore: 0,
  };
}

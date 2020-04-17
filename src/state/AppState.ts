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

export function TeamReverse(team: Team) {
  if (team === Team.Left) {
    return Team.Right;
  }
  if (team === Team.Right) {
    return Team.Left;
  }
  return Team.Unset;
}

export function TeamName(team: Team) {
  if (team === Team.Left) {
    return "LEFT BRAIN";
  }
  if (team === Team.Right) {
    return "RIGHT BRAIN";
  }
  return "the players";
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
  counterGuess: "left" | "right";
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
    counterGuess: "left",
    players: {},
    clueGiver: "",
    leftScore: 0,
    rightScore: 0,
  };
}

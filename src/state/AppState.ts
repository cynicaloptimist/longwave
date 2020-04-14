import { RandomSpectrumCard } from "./SpectrumCards";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";

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
  spectrumCard: [string, string];
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
    spectrumCard: RandomSpectrumCard(),
    spectrumTarget: RandomSpectrumTarget(),
    clue: "",
    guess: 0,
    players: {},
    clueGiver: "",
    leftScore: 0,
    rightScore: 0,
  };
}

type Player = {
  id: string;
  name: string;
  team: Team;
};

export interface GameModel {
  state: GameState;
  localPlayer: Player;
  clueGiver: Player | null;
  setGameState: (newState: Partial<GameState>) => void;
}

export function BuildGameModel(
  gameState: GameState,
  setGameState: (newState: Partial<GameState>) => void,
  localPlayerId: string
) {
  const clueGiver = gameState.players[gameState.clueGiver]
    ? {
        ...gameState.players[gameState.clueGiver],
        id: gameState.clueGiver,
      }
    : null;

  return {
    state: gameState,
    localPlayer: { ...gameState.players[localPlayerId], id: localPlayerId },
    clueGiver,
    setGameState,
  };
}

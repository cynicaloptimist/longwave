import { GameType, PlayersTeams, GameState, Team } from "./GameState";
import { NewRound } from "./NewRound";

export function NewTeamGame(
  players: PlayersTeams,
  startPlayer: string,
  gameState: GameState
): Partial<GameState> {
  const initialScores: Partial<GameState> = {
    leftScore: 0,
    rightScore: 0,
  };

  const playerTeam = players[startPlayer].team;
  if (playerTeam === Team.Left) {
    initialScores.rightScore = 1;
  } else {
    initialScores.leftScore = 1;
  }

  return {
    ...NewRound(startPlayer, gameState),
    ...initialScores,
    previousTurn: null,
    gameType: GameType.Teams,
  };
}

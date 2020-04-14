import { GameType, PlayersTeams, GameState, Team } from "./AppState";
import { NewRound } from "./NewRound";

export function NewTeamGame(
  players: PlayersTeams,
  startPlayer: string
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
    ...NewRound(startPlayer),
    ...initialScores,
    gameType: GameType.Teams,
  };
}

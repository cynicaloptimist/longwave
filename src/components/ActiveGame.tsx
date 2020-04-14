import React from "react";
import { RoundPhase, GameType, Team } from "../state/AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { JoinTeam } from "./JoinTeam";
import { NewRound } from "../state/NewRound";
import { ScoreRound } from "../state/ScoreForPlayerTeam";
import { Scoreboard } from "./Scoreboard";
import { RandomSpectrumCard } from "../state/SpectrumCards";
import { RandomSpectrumTarget } from "../state/RandomSpectrumTarget";
import { SetupGame } from "./SetupGame";
import { CounterGuess } from "./CounterGuess";
import { useContext } from "react";
import { GameModelContext } from "../state/GameModelContext";

export function ActiveGame() {
  const { state: gameState, localPlayer, setGameState } = useContext(
    GameModelContext
  );

  if (gameState.roundPhase === RoundPhase.SetupGame) {
    return <SetupGame />;
  }

  if (
    gameState.gameType === GameType.Teams &&
    (gameState.roundPhase === RoundPhase.PickTeams ||
      localPlayer.team === Team.Unset)
  ) {
    return <JoinTeam />;
  }

  return (
    <>
      {gameState.roundPhase === RoundPhase.GiveClue && <GiveClue />}
      {gameState.roundPhase === RoundPhase.MakeGuess && (
        <MakeGuess
          {...gameState}
          playerId={localPlayer.id}
          setGuess={(guess: number) => {
            setGameState({
              guess,
            });
          }}
          submitGuess={() => {
            if (gameState.gameType === GameType.Teams) {
              setGameState({
                roundPhase: RoundPhase.CounterGuess,
              });
            } else {
              setGameState({
                roundPhase: RoundPhase.ViewScore,
              });
            }
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.CounterGuess && (
        <CounterGuess
          {...gameState}
          playerId={localPlayer.id}
          guessLeft={() => {
            setGameState(ScoreRound(gameState, localPlayer.id, "left"));
          }}
          guessRight={() => {
            setGameState(ScoreRound(gameState, localPlayer.id, "right"));
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.ViewScore && (
        <ViewScore
          gameState={gameState}
          playerId={localPlayer.id}
          nextRound={() => setGameState(NewRound(localPlayer.id))}
        />
      )}
      <Scoreboard
        {...gameState}
        removePlayer={(playerId) => {
          delete gameState.players[playerId];
          setGameState(gameState);
        }}
      />
    </>
  );
}

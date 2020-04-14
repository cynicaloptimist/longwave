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
import { NewTeamGame } from "../state/NewGame";
import { CounterGuess } from "./CounterGuess";
import { useContext } from "react";
import { GameModelContext } from "../state/GameModelContext";

export function ActiveGame() {
  const { state: gameState, localPlayer, setGameState } = useContext(
    GameModelContext
  );

  if (gameState.roundPhase === RoundPhase.SetupGame) {
    return (
      <SetupGame
        startGame={(gameType) => {
          if (gameType === GameType.Teams) {
            setGameState({
              roundPhase: RoundPhase.PickTeams,
              gameType,
            });
          }
          setGameState({
            ...NewRound(localPlayer.id),
            gameType,
          });
        }}
      />
    );
  }

  if (
    gameState.gameType === GameType.Teams &&
    (gameState.roundPhase === RoundPhase.PickTeams ||
      localPlayer.team === Team.Unset)
  ) {
    return (
      <JoinTeam
        {...gameState}
        joinTeam={(team) => {
          setGameState({
            players: {
              ...gameState.players,
              [localPlayer.id]: {
                ...localPlayer,
                team,
              },
            },
          });
        }}
        startGame={() => {
          setGameState(NewTeamGame(gameState.players, localPlayer.id));
        }}
      />
    );
  }

  return (
    <>
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          {...gameState}
          playerId={localPlayer.id}
          updateClueGiver={(playerId: string) => {
            setGameState({
              clueGiver: playerId,
            });
          }}
          redrawCard={() => {
            setGameState({
              spectrumCard: RandomSpectrumCard(),
              spectrumTarget: RandomSpectrumTarget(),
            });
          }}
          submitClue={(clue) => {
            setGameState({
              clue,
              guess: 0,
              roundPhase: RoundPhase.MakeGuess,
            });
          }}
        />
      )}
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

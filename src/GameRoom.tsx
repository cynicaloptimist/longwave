import { useParams } from "react-router-dom";
import React from "react";
import { RoundPhase, GameState } from "./AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { useStorageBackedState } from "./useStorageBackedState";
import { useNetworkBackedGameState } from "./useNetworkBackedGameState";
import { InputName } from "./InputName";
import { JoinTeam } from "./JoinTeam";
import { RandomSpectrumCard } from "./SpectrumCards";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";
import { Lobby } from "./Lobby";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [playerName, setPlayerName] = useStorageBackedState("", "name");
  const [gameState, setGameState] = useNetworkBackedGameState(
    roomId,
    playerName
  );

  if (playerName.length === 0) {
    return <InputName setName={setPlayerName} />;
  }

  if (!gameState?.players?.[playerName]) {
    return null;
  }

  if (gameState.players[playerName].team === "none") {
    return (
      <JoinTeam
        {...gameState}
        joinTeam={(team) => {
          setGameState({
            players: {
              ...gameState.players,
              [playerName]: {
                team,
              },
            },
          });
        }}
      />
    );
  }

  return (
    <div>
      <h1>{roomId}</h1>
      {gameState.roundPhase === RoundPhase.SetupGame && (
        <Lobby
          {...gameState}
          startGame={() => setGameState(newRound(gameState, playerName))}
        />
      )}
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          spectrumCard={gameState.spectrumCard}
          spectrumTarget={gameState.spectrumTarget}
          submitClue={(clue) => {
            setGameState({
              clue,
              roundPhase: RoundPhase.MakeGuess,
            });
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.MakeGuess && (
        <MakeGuess
          clue={gameState.clue}
          spectrumCard={gameState.spectrumCard}
          submitGuess={(guess) => {
            setGameState({
              guess,
              roundPhase: RoundPhase.ViewScore,
            });
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.ViewScore && (
        <ViewScore
          spectrumTarget={gameState.spectrumTarget}
          guess={gameState.guess}
          nextRound={() => setGameState(newRound(gameState, playerName))}
        />
      )}
    </div>
  );
}

function newRound(
  gameState: GameState,
  playerName: string
): Partial<GameState> {
  return {
    clueGiver: playerName,
    roundPhase: RoundPhase.GiveClue,
    spectrumCard: RandomSpectrumCard(),
    spectrumTarget: RandomSpectrumTarget(),
  };
}

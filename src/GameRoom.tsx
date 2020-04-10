import { useParams } from "react-router-dom";
import React from "react";
import { RoundPhase, InitialGameState } from "./AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { useStorageBackedState } from "./useStorageBackedState";
import { useNetworkBackedGameState } from "./useNetworkBackedGameState";
import { InputName } from "./InputName";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [gameState, setGameState] = useNetworkBackedGameState(roomId);
  const [name, setName] = useStorageBackedState("", "name");
  if (name.length === 0) {
    return <InputName setName={setName} />;
  }

  if (!gameState.players.includes(name)) {
    setGameState({
      ...gameState,
      players: [...gameState.players, name],
    });
  }

  return (
    <div>
      <h1>{roomId}</h1>
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          spectrumCard={gameState.spectrumCard}
          spectrumTarget={gameState.spectrumTarget}
          submitClue={(clue) => {
            setGameState({
              ...gameState,
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
              ...gameState,
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
          nextRound={() => setGameState(InitialGameState())}
        />
      )}
    </div>
  );
}

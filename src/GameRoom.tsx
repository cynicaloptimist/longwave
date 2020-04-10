import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState, RoundPhase, InitialGameState } from "./AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [gameState, setGameState] = useNetworkBackedGameState(roomId);

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

function useNetworkBackedGameState(
  roomId: string
): [GameState, (newState: GameState) => void] {
  const [gameState, setGameState] = useState<GameState>(InitialGameState());

  useEffect(() => {
    const dbRef = database().ref("rooms/" + roomId);
    dbRef.on("value", (appState) => {
      if (!appState.val()) {
        return;
      }
      setGameState(appState.val());
    });
    return () => dbRef.off();
  }, [roomId]);

  return [
    gameState,
    (newState: GameState) => {
      database()
        .ref("rooms/" + roomId)
        .set(newState);
    },
  ];
}

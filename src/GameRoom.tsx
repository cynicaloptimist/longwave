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

  return (
    <div>
      <h1>{roomId || "Room Id missing"}</h1>
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          spectrumCard={gameState.spectrumCard}
          spectrumTarget={gameState.spectrumTarget}
          submitClue={(clue) => {
            writeGameState(roomId, {
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
            writeGameState(roomId, {
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
          nextRound={() => writeGameState(roomId, InitialGameState())}
        />
      )}
    </div>
  );
}

function writeGameState(roomId: string, gameState: GameState) {
  database()
    .ref("rooms/" + roomId)
    .set(gameState);
}

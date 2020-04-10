import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { database } from "firebase";

interface GameState {
  roomId: string;
  increment: number;
}

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [gameState, setGameState] = useState<GameState>({
    roomId,
    increment: 0,
  });

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
      {gameState.roomId || "Room Id missing"}
      <div
        onClick={() =>
          writeGameState({
            roomId,
            increment: gameState.increment + 1,
          })
        }
      >
        Increment:{" "}
      </div>
      {gameState.increment}
    </div>
  );
}

function writeGameState(gameState: GameState) {
  database()
    .ref("rooms/" + gameState.roomId)
    .set(gameState);
}

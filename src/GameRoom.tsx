import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState } from "./AppState";
import { RandomScaleCard } from "./ScaleCards";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [gameState, setGameState] = useState<GameState>({
    increment: 0,
  });
  const [scaleCard, setScaleCard] = useState(RandomScaleCard());

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
      {roomId || "Room Id missing"}
      <div
        onClick={() =>
          writeGameState(roomId, {
            increment: gameState.increment + 1,
          })
        }
      >
        Increment:{" "}
      </div>
      {gameState.increment}
      <div>
        {scaleCard[0]} | {scaleCard[1]}
      </div>
    </div>
  );
}

function writeGameState(roomId: string, gameState: GameState) {
  database()
    .ref("rooms/" + roomId)
    .set(gameState);
}

import { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState, InitialGameState } from "./AppState";

export function useNetworkBackedGameState(
  roomId: string,
  playerId: string,
  playerName: string
): [GameState, (newState: Partial<GameState>) => void] {
  const [gameState, setGameState] = useState<GameState>(InitialGameState());

  useEffect(() => {
    const dbRef = database().ref("rooms/" + roomId);

    dbRef
      .child("players/" + playerId)
      .onDisconnect()
      .remove();

    dbRef.on("value", (appState) => {
      const networkGameState: GameState = appState.val();
      const completeGameState = {
        ...InitialGameState(),
        ...networkGameState,
      };

      if (networkGameState?.roundPhase === undefined) {
        dbRef.set(completeGameState);
        return;
      }

      if (completeGameState.players[playerId] === undefined) {
        completeGameState.players[playerId] = {
          name: playerName,
          team: "none",
        };
        dbRef.set(completeGameState);
        return;
      }

      setGameState(completeGameState);
    });
    return () => dbRef.off();
  }, [playerId, playerName, roomId]);

  const dbRef = database().ref("rooms/" + roomId);

  return [
    gameState,
    (newState: Partial<GameState>) => {
      dbRef.set({
        ...gameState,
        ...newState,
      });
    },
  ];
}

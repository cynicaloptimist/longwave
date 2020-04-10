import { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState, InitialGameState } from "./AppState";

export function useNetworkBackedGameState(
  roomId: string,
  playerName: string
): [GameState, (newState: GameState) => void] {
  const [gameState, setGameState] = useState<GameState>(InitialGameState());
  const dbRef = database().ref("rooms/" + roomId);

  useEffect(() => {
    dbRef
      .child("players/" + playerName)
      .onDisconnect()
      .remove();
    dbRef
      .child("leftTeam/" + playerName)
      .onDisconnect()
      .remove();
    dbRef
      .child("rightTeam/" + playerName)
      .onDisconnect()
      .remove();
    dbRef.child("players/" + playerName).set(true);
  }, [dbRef, playerName]);

  useEffect(() => {
    dbRef.on("value", (appState) => {
      const networkGameState: GameState = appState.val();
      if (!networkGameState.roundPhase) {
        dbRef.set({
          ...InitialGameState(),
          ...networkGameState,
        });
        return;
      }

      setGameState(networkGameState);
    });
    return () => dbRef.off();
  }, [dbRef]);

  return [
    gameState,
    (newState: GameState) => {
      dbRef.set(newState);
    },
  ];
}

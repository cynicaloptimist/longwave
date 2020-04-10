import { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState, InitialGameState } from "./AppState";

export function useNetworkBackedGameState(
  roomId: string,
  playerName: string
): [GameState, (newState: Partial<GameState>) => void] {
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
      const completeGameState = {
        ...InitialGameState(),
        ...networkGameState,
      };
      if (networkGameState.roundPhase === undefined) {
        dbRef.set(completeGameState);
        return;
      }

      setGameState(completeGameState);
    });
    return () => dbRef.off();
  }, [dbRef]);

  return [
    gameState,
    (newState: Partial<GameState>) => {
      dbRef.set({
        ...gameState,
        ...newState
      });
    },
  ];
}

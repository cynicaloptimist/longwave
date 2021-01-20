import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { GameState, InitialGameState, Team } from "../../state/GameState";

export function useNetworkBackedGameState(
  roomId: string,
  playerId: string,
  playerName: string
): [GameState, (newState: Partial<GameState>) => void] {
  const [gameState, setGameState] = useState<GameState>(InitialGameState());

  useEffect(() => {
    const dbRef = firebase.database().ref("rooms/" + roomId);

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
          team: Team.Unset,
        };
        dbRef.set(completeGameState);
        return;
      }

      setGameState(completeGameState);
    });
    return () => dbRef.off();
  }, [playerId, playerName, roomId]);

  const dbRef = firebase.database().ref("rooms/" + roomId);

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

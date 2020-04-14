import { useParams } from "react-router-dom";
import React from "react";
import { useStorageBackedState } from "./useStorageBackedState";
import { useNetworkBackedGameState } from "./useNetworkBackedGameState";
import { InputName } from "./InputName";
import { RandomFourCharacterString } from "../state/RandomFourCharacterString";
import { GameModelContext } from "../state/GameModelContext";
import { ActiveGame } from "./ActiveGame";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [playerName, setPlayerName] = useStorageBackedState("", "name");
  const [playerId] = useStorageBackedState(
    RandomFourCharacterString(),
    "playerId"
  );

  const [gameState, setGameState] = useNetworkBackedGameState(
    roomId,
    playerId,
    playerName
  );

  if (playerName.length === 0) {
    return (
      <InputName
        setName={(name) => {
          setPlayerName(name);
          gameState.players[playerId].name = name;
          setGameState(gameState);
        }}
      />
    );
  }

  if (!gameState?.players?.[playerId]) {
    return null;
  }

  const clueGiver = gameState.players[gameState.clueGiver]
    ? {
        ...gameState.players[gameState.clueGiver],
        id: gameState.clueGiver,
      }
    : null;

  return (
    <GameModelContext.Provider
      value={{
        state: gameState,
        localPlayer: { ...gameState.players[playerId], id: playerId },
        clueGiver,
        setGameState,
      }}
    >
      <ActiveGame />
    </GameModelContext.Provider>
  );
}

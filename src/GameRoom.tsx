import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState, RoundPhase, InitialGameState } from "./AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { useRef } from "react";

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

function useStorageBackedState<T>(
  initialValue: T,
  key: string
): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);
  const storedItem = localStorage.getItem(key);
  if (storedItem !== null) {
    const storedValue = JSON.parse(storedItem);
    if (value !== storedValue) {
      setValue(storedValue);
    }
  }
  return [
    value,
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
  ];
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

function InputName(props: { setName: (name: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div>Enter your name:</div>
      <div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(event) => {
            if (!inputRef.current) {
              return false;
            }
            if (event.key !== "Enter") {
              return true;
            }
            props.setName(inputRef.current.value);
          }}
        />
      </div>
    </div>
  );
}

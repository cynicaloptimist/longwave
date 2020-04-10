import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { database } from "firebase";
import { GameState, RoundPhase } from "./AppState";
import { RandomSpectrumCard } from "./SpectrumCards";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [gameState, setGameState] = useState<GameState>({
    increment: 0,
  });

  const [roundPhase, setRoundPhase] = useState(RoundPhase.GiveClue);
  const [spectrumCard, setSpectrumCard] = useState(RandomSpectrumCard());
  const [spectrumTarget, setSpectrumTarget] = useState(RandomSpectrumTarget());
  const [clue, setClue] = useState("");
  const [guess, setGuess] = useState(0);

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
      {roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          spectrumCard={spectrumCard}
          spectrumTarget={spectrumTarget}
          submitClue={(clue) => {
            setClue(clue);
            setRoundPhase(RoundPhase.MakeGuess);
          }}
        />
      )}
      {roundPhase === RoundPhase.MakeGuess && (
        <MakeGuess
          clue={clue}
          spectrumCard={spectrumCard}
          submitGuess={(guess) => {
            setGuess(guess);
            setRoundPhase(RoundPhase.ViewScore);
          }}
        />
      )}
      {roundPhase === RoundPhase.ViewScore && (
        <ViewScore
          spectrumTarget={spectrumTarget}
          guess={guess}
          nextRound={() => {
            setSpectrumCard(RandomSpectrumCard());
            setSpectrumTarget(RandomSpectrumTarget());
            setRoundPhase(RoundPhase.GiveClue);
          }}
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

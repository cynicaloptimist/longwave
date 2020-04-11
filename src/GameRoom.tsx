import { useParams } from "react-router-dom";
import React from "react";
import { RoundPhase } from "./AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { useStorageBackedState } from "./useStorageBackedState";
import { useNetworkBackedGameState } from "./useNetworkBackedGameState";
import { InputName } from "./InputName";
import { JoinTeam } from "./JoinTeam";
import { Lobby } from "./Lobby";
import { getScore } from "./getScore";
import { randomFourCharacterString } from "./randomFourCharacterString";
import { Row } from "./LayoutElements";
import { newRound } from "./newRound";
import { scoreForPlayerTeam } from "./scoreForPlayerTeam";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [playerName, setPlayerName] = useStorageBackedState("", "name");
  const [playerId] = useStorageBackedState(
    randomFourCharacterString(),
    "playerId"
  );

  const [gameState, setGameState] = useNetworkBackedGameState(
    roomId,
    playerId,
    playerName
  );

  if (playerName.length === 0) {
    return <InputName setName={setPlayerName} />;
  }

  if (!gameState?.players?.[playerId]) {
    return null;
  }

  const roomIdLabel = (
    <Row style={{ justifyContent: "flex-end", color: "gray" }}>
      Room ID: {roomId}
    </Row>
  );

  if (gameState.players[playerId].team === "none") {
    return (
      <>
        {roomIdLabel}
        <JoinTeam
          {...gameState}
          joinTeam={(team) => {
            setGameState({
              players: {
                ...gameState.players,
                [playerId]: {
                  name: playerName,
                  team,
                },
              },
            });
          }}
        />
      </>
    );
  }

  if (!gameState.players[gameState.clueGiver]) {
    setGameState({
      clueGiver: playerId,
    });
    return null;
  }

  return (
    <>
      {roomIdLabel}
      {gameState.roundPhase === RoundPhase.SetupGame && (
        <Lobby
          {...gameState}
          startGame={() => setGameState(newRound(playerId))}
        />
      )}
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          {...gameState}
          playerId={playerId}
          submitClue={(clue) => {
            setGameState({
              clue,
              roundPhase: RoundPhase.MakeGuess,
            });
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.MakeGuess && (
        <MakeGuess
          {...gameState}
          playerId={playerId}
          submitGuess={(guess) => {
            const pointsScored = getScore(gameState.spectrumTarget, guess);
            setGameState({
              guess,
              roundPhase: RoundPhase.ViewScore,
              ...scoreForPlayerTeam(gameState, playerId, pointsScored),
            });
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.ViewScore && (
        <ViewScore
          {...gameState}
          nextRound={() => setGameState(newRound(playerId))}
        />
      )}
    </>
  );
}

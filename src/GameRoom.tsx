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
import { getScore } from "./getScore";
import { randomFourCharacterString } from "./randomFourCharacterString";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { newRound } from "./newRound";
import { scoreForPlayerTeam } from "./scoreForPlayerTeam";
import { Scoreboard } from "./Scoreboard";
import { Button } from "./Button";

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
    <CenteredRow
      style={{
        justifyContent: "flex-end",
        color: "gray",
      }}
    >
      Room ID: {roomId}
    </CenteredRow>
  );

  if (gameState.players[playerId].team === "none") {
    return (
      <CenteredColumn style={{ alignItems: "stretch" }}>
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
      </CenteredColumn>
    );
  }

  return (
    <>
      {roomIdLabel}
      {gameState.roundPhase === RoundPhase.SetupGame && (
        <CenteredColumn>
          <Button
            text="Begin Game"
            onClick={() => setGameState(newRound(playerId))}
          />
        </CenteredColumn>
      )}
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          {...gameState}
          playerId={playerId}
          updateClueGiver={(playerId: string) => {
            setGameState({
              clueGiver: playerId,
            });
          }}
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
          setGuess={(guess: number) => {
            setGameState({
              guess,
            });
          }}
          submitGuess={() => {
            const pointsScored = getScore(
              gameState.spectrumTarget,
              gameState.guess
            );
            setGameState({
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
      <Scoreboard
        {...gameState}
        removePlayer={(playerId) => {
          delete gameState.players[playerId];
          setGameState(gameState);
        }}
      />
    </>
  );
}

import { useParams } from "react-router-dom";
import React from "react";
import { RoundPhase, GameState } from "./AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { useStorageBackedState } from "./useStorageBackedState";
import { useNetworkBackedGameState } from "./useNetworkBackedGameState";
import { InputName } from "./InputName";
import { JoinTeam } from "./JoinTeam";
import { RandomSpectrumCard } from "./SpectrumCards";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";
import { Lobby } from "./Lobby";
import { getScore } from "./getScore";

export function GameRoom() {
  const { roomId } = useParams();
  if (roomId === undefined) {
    throw new Error("RoomId missing");
  }

  const [playerName, setPlayerName] = useStorageBackedState("", "name");
  const [gameState, setGameState] = useNetworkBackedGameState(
    roomId,
    playerName
  );

  if (playerName.length === 0) {
    return <InputName setName={setPlayerName} />;
  }

  if (!gameState?.players?.[playerName]) {
    return null;
  }

  if (gameState.players[playerName].team === "none") {
    return (
      <JoinTeam
        {...gameState}
        joinTeam={(team) => {
          setGameState({
            players: {
              ...gameState.players,
              [playerName]: {
                team,
              },
            },
          });
        }}
      />
    );
  }

  return (
    <div>
      <h1>{roomId}</h1>
      {gameState.roundPhase === RoundPhase.SetupGame && (
        <Lobby
          {...gameState}
          startGame={() => setGameState(newRound(playerName))}
        />
      )}
      {gameState.roundPhase === RoundPhase.GiveClue && (
        <GiveClue
          {...gameState}
          playerName={playerName}
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
          playerName={playerName}
          submitGuess={(guess) => {
            const pointsScored = getScore(gameState.spectrumTarget, guess);
            setGameState({
              guess,
              roundPhase: RoundPhase.ViewScore,
              ...scoreForPlayerTeam(gameState, playerName, pointsScored),
            });
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.ViewScore && (
        <ViewScore
          {...gameState}
          nextRound={() => setGameState(newRound(playerName))}
        />
      )}
    </div>
  );
}

function newRound(playerName: string): Partial<GameState> {
  return {
    clueGiver: playerName,
    roundPhase: RoundPhase.GiveClue,
    spectrumCard: RandomSpectrumCard(),
    spectrumTarget: RandomSpectrumTarget(),
  };
}

function scoreForPlayerTeam(
  gameState: GameState,
  playerName: string,
  pointsScored: number
): Partial<GameState> {
  if (gameState.players[playerName].team === "left") {
    return {
      leftScore: gameState.leftScore + pointsScored,
    };
  }

  if (gameState.players[playerName].team === "right") {
    return {
      leftScore: gameState.rightScore + pointsScored,
    };
  }

  return {};
}

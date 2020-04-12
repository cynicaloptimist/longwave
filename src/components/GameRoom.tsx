import { useParams } from "react-router-dom";
import React from "react";
import { RoundPhase, GameType } from "../state/AppState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { useStorageBackedState } from "./useStorageBackedState";
import { useNetworkBackedGameState } from "./useNetworkBackedGameState";
import { InputName } from "./InputName";
import { JoinTeam } from "./JoinTeam";
import { GetScore } from "../state/GetScore";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { NewRound } from "../state/NewRound";
import { ScoreForPlayerTeam } from "../state/ScoreForPlayerTeam";
import { Scoreboard } from "./Scoreboard";
import { Button } from "./Button";
import { RandomSpectrumCard } from "../state/SpectrumCards";
import { RandomSpectrumTarget } from "../state/RandomSpectrumTarget";
import { RandomFourCharacterString } from "../state/RandomFourCharacterString";
import { Title } from "./Title";

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
    return <InputName setName={setPlayerName} />;
  }

  if (!gameState?.players?.[playerId]) {
    return null;
  }

  const playerTeam = gameState.players[playerId].team;

  const scoreboardVisible =
    gameState.roundPhase !== RoundPhase.SetupGame && playerTeam !== "none";

  return (
    <>
      <CenteredRow
        style={{
          justifyContent: "flex-end",
          color: "gray",
        }}
      >
        Room ID: {roomId}
      </CenteredRow>
      {playerTeam !== "none" && (
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
      )}
      {gameState.roundPhase === RoundPhase.SetupGame && (
        <SetupGame
          startGame={(gameType) =>
            setGameState({
              ...NewRound(playerId),
              gameType,
            })
          }
        />
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
          redrawCard={() => {
            setGameState({
              spectrumCard: RandomSpectrumCard(),
              spectrumTarget: RandomSpectrumTarget(),
            });
          }}
          submitClue={(clue) => {
            setGameState({
              clue,
              guess: 0,
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
            const pointsScored = GetScore(
              gameState.spectrumTarget,
              gameState.guess
            );
            setGameState({
              roundPhase: RoundPhase.ViewScore,
              ...ScoreForPlayerTeam(gameState, playerId, pointsScored),
            });
          }}
        />
      )}
      {gameState.roundPhase === RoundPhase.ViewScore && (
        <ViewScore
          {...gameState}
          nextRound={() => setGameState(NewRound(playerId))}
        />
      )}
      {scoreboardVisible && (
        <Scoreboard
          {...gameState}
          removePlayer={(playerId) => {
            delete gameState.players[playerId];
            setGameState(gameState);
          }}
        />
      )}
    </>
  );
}

function SetupGame(props: { startGame: (gameType: GameType) => void }) {
  return (
    <CenteredColumn>
      <Title />
      <Button
        text="Begin Game"
        onClick={() => props.startGame(GameType.Teams)}
      />
    </CenteredColumn>
  );
}

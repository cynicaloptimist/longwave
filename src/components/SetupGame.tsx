import React from "react";
import { GameType, RoundPhase } from "../state/AppState";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
import { Title } from "./Title";
import { useContext } from "react";
import { GameModelContext } from "../state/GameModelContext";
import { NewRound } from "../state/NewRound";

export function SetupGame() {
  const { gameState, setGameState, localPlayer } = useContext(GameModelContext);

  const startGame = (gameType: GameType) => {
    if (gameType === GameType.Teams) {
      setGameState({
        roundPhase: RoundPhase.PickTeams,
        gameType,
      });
    } else {
      setGameState({
        ...NewRound(localPlayer.id, gameState.deckIndex),
        gameType,
      });
    }
  };

  return (
    <CenteredColumn>
      <Title />
      <CenteredRow>
        <Button
          text="Standard (Teams)"
          onClick={() => startGame(GameType.Teams)}
        />
        {/* <Button
          text="Cooperative"
          onClick={() => startGame(GameType.Cooperative)}
        /> */}
        <Button text="Free Play" onClick={() => startGame(GameType.Freeplay)} />
      </CenteredRow>
    </CenteredColumn>
  );
}

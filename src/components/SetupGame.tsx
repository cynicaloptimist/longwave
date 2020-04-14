import React from "react";
import { GameType } from "../state/AppState";
import { CenteredRow, CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
import { Title } from "./Title";

export function SetupGame(props: { startGame: (gameType: GameType) => void }) {
  return (
    <CenteredColumn>
      <Title />
      <CenteredRow>
        <Button
          text="Standard (Teams)"
          onClick={() => props.startGame(GameType.Teams)}
        />
        {/* <Button
          text="Cooperative"
          onClick={() => props.startGame(GameType.Cooperative)}
        /> */}
        <Button
          text="Free Play"
          onClick={() => props.startGame(GameType.Freeplay)}
        />
      </CenteredRow>
    </CenteredColumn>
  );
}

import React from "react";
import { GameType, PlayersTeams, Team } from "../state/AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { Button } from "./Button";

export function CounterGuess(props: {
  gameType: GameType;
  players: PlayersTeams;
  clueGiver: string;
  spectrumCard: [string, string];
  clue: string;
  playerId: string;
  guess: number;
  guessLeft: () => void;
  guessRight: () => void;
}) {
  const guessingTeam = props.players[props.clueGiver].team;
  const playerTeam = props.players[props.playerId].team;
  const notMyTurn = guessingTeam === playerTeam;
  const clueGiverName = props.players[props.clueGiver].name;
  const counterGuessTeamString =
    guessingTeam === Team.Left ? "RIGHT BRAIN" : "LEFT BRAIN";

  if (notMyTurn) {
    return (
      <div>
        <Spectrum
          spectrumCard={props.spectrumCard}
          guessingValue={props.guess}
        />
        <CenteredColumn>
          <div>
            {clueGiverName}'s clue: <strong>{props.clue}</strong>
          </div>
          <div>Waiting for {counterGuessTeamString} to guess left/right...</div>
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      <Spectrum spectrumCard={props.spectrumCard} guessingValue={props.guess} />
      <CenteredColumn>
        <div>
          {clueGiverName}'s clue: <strong>{props.clue}</strong>
        </div>
      </CenteredColumn>
      <CenteredRow>
        <Button text="Target is to the Left" onClick={props.guessLeft} />
        <Button text="Target is to the Right" onClick={props.guessRight} />
      </CenteredRow>
    </div>
  );
}

import React from "react";
import { PlayersTeams, GameType } from "../state/AppState";
import { Spectrum } from "./Spectrum";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
export function MakeGuess(props: {
  gameType: GameType;
  players: PlayersTeams;
  clueGiver: string;
  spectrumCard: [string, string];
  clue: string;
  playerId: string;
  guess: number;
  setGuess: (guess: number) => void;
  submitGuess: () => void;
}) {
  const guessingTeam = props.players[props.clueGiver].team;
  const playerTeam = props.players[props.playerId].team;
  const notMyTurn =
    props.playerId === props.clueGiver ||
    (props.gameType === GameType.Teams && guessingTeam !== playerTeam);

  const clueGiverName = props.players[props.clueGiver].name;
  
  let guessingTeamString = "the players";
  if (props.gameType === GameType.Teams) {
    guessingTeamString = guessingTeam === "left" ? "LEFT BRAIN" : "RIGHT BRAIN";
  }

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
          <div>Waiting for {guessingTeamString} to guess...</div>
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      <Spectrum
        spectrumCard={props.spectrumCard}
        handleValue={props.guess}
        onChange={props.setGuess}
      />
      <CenteredColumn>
        <div>
          {clueGiverName}'s clue: <strong>{props.clue}</strong>
        </div>
        <div>
          <Button
            text="Submit Guess"
            onClick={() => {
              props.submitGuess();
            }}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}

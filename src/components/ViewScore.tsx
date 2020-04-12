import React from "react";
import { GetScore } from "../state/GetScore";
import { CenteredColumn } from "./LayoutElements";
import { Spectrum } from "./Spectrum";
import { Button } from "./Button";

export function ViewScore(props: {
  spectrumCard: [string, string];
  spectrumTarget: number;
  guess: number;
  nextRound: () => void;
}) {
  const score = GetScore(props.spectrumTarget, props.guess);
  return (
    <div>
      <Spectrum
        spectrumCard={props.spectrumCard}
        handleValue={props.guess}
        targetValue={props.spectrumTarget}
      />
      <CenteredColumn>
        <div>Score: {score} points!</div>
        <div>
          <Button text="Draw next Spectrum Card"
            onClick={props.nextRound}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}

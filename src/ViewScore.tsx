import React from "react";
import { getScore } from "./getScore";
import { Row, Column } from "./LayoutElements";
import { Spectrum } from "./Spectrum";

export function ViewScore(props: {
  spectrumCard: [string, string];
  spectrumTarget: number;
  guess: number;
  leftScore: number;
  rightScore: number;
  nextRound: () => void;
}) {
  const score = getScore(props.spectrumTarget, props.guess);
  return (
    <div>
      <Spectrum
        spectrumCard={props.spectrumCard}
        handleValue={props.guess}
        targetValue={props.spectrumTarget}
      />
      <Column>
        <div>Target: {props.spectrumTarget}</div>
        <div>Guess: {props.guess}</div>
        <div>Score: {score} points!</div>
        <Row style={{ alignSelf: "stretch" }}>
          <div>Left Brain: {props.leftScore}</div>
          <div>Right Brain: {props.rightScore}</div>
        </Row>
        <div>
          <input
            type="button"
            value="Draw a Spectrum Card"
            onClick={props.nextRound}
          />
        </div>
      </Column>
    </div>
  );
}

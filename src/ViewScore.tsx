import React from "react";
import { getScore } from "./getScore";
import { Row, Column } from "./LayoutElements";

export function ViewScore(props: {
  spectrumTarget: number;
  guess: number;
  leftScore: number;
  rightScore: number;
  nextRound: () => void;
}) {
  const score = getScore(props.spectrumTarget, props.guess);
  return (
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
  );
}

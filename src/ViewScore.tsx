import React from "react";
import { getScore } from "./getScore";
import { Row } from "./LayoutElements";

export function ViewScore(props: {
  spectrumTarget: number;
  guess: number;
  leftScore: number;
  rightScore: number;
  nextRound: () => void;
}) {
  const score = getScore(props.spectrumTarget, props.guess);
  return (
    <div>
      <div>Target: {props.spectrumTarget}</div>
      <div>Guess: {props.guess}</div>
      <div>Score: {score} points!</div>
      <Row>
        <div>Left Brain: {props.leftScore}</div>
        <div>Right Brain: {props.rightScore}</div>
      </Row>
      <div>
        <input type="button" value="Next Round" onClick={props.nextRound} />
      </div>
    </div>
  );
}

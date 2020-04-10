import React from "react";
import { getScore } from "./getScore";

export function ViewScore(props: {
  spectrumTarget: number;
  guess: number;
  nextRound: () => void;
}) {
  const score = getScore(props.spectrumTarget, props.guess);
  return (<div>
    <div>Target: {props.spectrumTarget}</div>
    <div>Guess: {props.guess}</div>
    <div>Score: {score} points!</div>
    <div>
      <input type="button" value="Next Round" onClick={props.nextRound} />
    </div>
  </div>);
}

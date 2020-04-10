import React from "react";

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

function getScore(target: number, guess: number) {
  const difference = Math.abs(target - guess);
  if (difference > 20) {
    return 0;
  }
  return 4 - Math.floor(difference / 5);
}

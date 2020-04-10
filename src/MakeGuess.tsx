import React, { useRef } from "react";
export function MakeGuess(props: {
  spectrumCard: [string, string];
  clue: string;
  submitGuess: (guess: number) => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);
  return (<div>
    <div>
      Spectrum: {props.spectrumCard[0]} | {props.spectrumCard[1]}
    </div>
    <div>Clue: {props.clue}</div>
    <div>
      <input type="number" placeholder="Guess..." ref={inputElement} />
    </div>
    <div>
      <input type="button" value="Submit Guess" onClick={() => {
        if (!inputElement.current) {
          return false;
        }
        const guess = parseInt(inputElement.current.value);
        if (isNaN(guess)) {
          return false;
        }
        props.submitGuess(guess);
      }} />
    </div>
  </div>);
}

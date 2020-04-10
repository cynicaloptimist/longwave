import React, { useRef } from "react";
export function GiveClue(props: {
  spectrumCard: [string, string];
  spectrumTarget: number;
  submitClue: (clue: string) => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);
  return (<div>
    <div>Target: {props.spectrumTarget} / 100</div>
    <div>
      Spectrum: {props.spectrumCard[0]} | {props.spectrumCard[1]}
    </div>
    <div>
      <input type="text" placeholder="Clue..." ref={inputElement} />
    </div>
    <div>
      <input type="button" value="Submit Clue" onClick={() => {
        if (!inputElement.current) {
          return false;
        }
        props.submitClue(inputElement.current.value);
      }} />
    </div>
  </div>);
}

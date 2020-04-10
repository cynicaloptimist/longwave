import React from "react";
import { useRef } from "react";
export function InputName(props: {
  setName: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (<div>
    <div>Enter your name:</div>
    <div>
      <input type="text" ref={inputRef} onKeyDown={(event) => {
        if (!inputRef.current) {
          return false;
        }
        if (event.key !== "Enter") {
          return true;
        }
        props.setName(inputRef.current.value);
      }} />
    </div>
  </div>);
}

import React from "react";
import { useRef } from "react";
import { CenteredColumn } from "../common/LayoutElements";
import { Title } from "../common/Title";

export function InputName(props: { setName: (name: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <CenteredColumn>
      <Title />
      <div>Enter your name:</div>
      <input
        type="text"
        ref={inputRef}
        onKeyDown={(event) => {
          if (!inputRef.current) {
            return false;
          }
          if (event.key !== "Enter") {
            return true;
          }
          props.setName(inputRef.current.value);
        }}
      />
    </CenteredColumn>
  );
}

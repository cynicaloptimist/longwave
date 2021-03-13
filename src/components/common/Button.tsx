import React from "react";

export function Button(props: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <input
      style={{
        padding: 8,
        margin: 8,
      }}
      type="button"
      value={props.text}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
}

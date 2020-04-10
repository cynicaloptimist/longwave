import React from "react";

const baseFlexStyles: React.CSSProperties = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "space-evenly",
  alignItems: "center"
};

export function Row(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...baseFlexStyles,
        flexFlow: "row",
      }}
    >
      {props.children}
    </div>
  );
}

export function Column(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...baseFlexStyles,
        flexFlow: "column",
      }}
    >
      {props.children}
    </div>
  );
}

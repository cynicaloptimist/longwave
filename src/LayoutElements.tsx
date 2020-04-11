import React from "react";

const baseFlexStyles: React.CSSProperties = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export function CenteredRow(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...baseFlexStyles,
        flexFlow: "row",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

export function CenteredColumn(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...baseFlexStyles,
        flexFlow: "column",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

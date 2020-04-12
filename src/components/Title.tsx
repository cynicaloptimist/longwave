import React from "react";
import { GetContrastingColors } from "./GetContrastingColors";

export function Title() {
  const [primary, secondary] = GetContrastingColors(Math.random() * 360);
  return (
    <h1
      style={{
        background: `linear-gradient(90deg, ${primary} 10%, ${secondary} 90%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Longwave
    </h1>
  );
}

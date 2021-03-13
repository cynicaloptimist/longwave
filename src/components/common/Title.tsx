import React from "react";
import { GetContrastingColors } from "./GetContrastingColors";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LongwaveAppTitle() {
  const { t } = useTranslation();
  const [hue, setHue] = useState(0);
  const [primary, secondary] = GetContrastingColors(hue);
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((hue) => (hue + 1) % 360);
    }, 5);
    return () => clearInterval(interval);
  });
  return (
    <h1
      style={{
        backgroundImage: `linear-gradient(90deg, ${primary} 10%, ${secondary} 90%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {t("title.longwave")}
    </h1>
  );
}

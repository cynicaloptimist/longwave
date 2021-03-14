import React from "react";
import Slider from "rc-slider";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { GetContrastingColors } from "./GetContrastingColors";
import { GetContrastingText } from "./GetContrastingText";

import { useTranslation } from "react-i18next";

export function Spectrum(props: {
  spectrumCard: [string, string];
  handleValue?: number;
  targetValue?: number;
  guessingValue?: number;
  onChange?: (newValue: number) => void;
}) {
  const { t } = useTranslation();

  const [primary, secondary] = GetContrastingColors(
    getStringHash(props.spectrumCard[0])
  );
  const cardBackStyle: React.CSSProperties = {
    padding: 8,
    fontWeight: "bold",
  };
  const primaryText = GetContrastingText(primary);
  const secondaryText = GetContrastingText(secondary);

  let handleStyle: React.CSSProperties = {
    height: 18,
    width: 18,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "black",
  };

  const dotStyle = {
    ...handleStyle,
    cursor: "auto",
    bottom: -9,
    borderWidth: 4,
    transform: "translateX(-5px)",
  };

  if (!props.onChange) {
    handleStyle.cursor = "auto";
    handleStyle.boxShadow = "none";
  }

  if (props.handleValue === undefined) {
    handleStyle.display = "none";
  }

  let marks: {
    [n: number]: { style: React.CSSProperties; label: string };
  } = {};

  if (props.targetValue !== undefined) {
    marks[props.targetValue] = {
      style: { fontWeight: "bold", color: "black", cursor: "auto" },
      label: t("spectrum.target"),
    };
  }

  if (props.guessingValue !== undefined) {
    marks[props.guessingValue] = {
      style: { fontWeight: "bold", color: "black", cursor: "auto" },
      label: t("spectrum.guessing"),
    };
  }

  return (
    <div style={{ padding: 8 }}>
      <CenteredColumn style={{ alignItems: "stretch" }}>
        <CenteredRow style={{ justifyContent: "space-between" }}>
          <div style={{ ...cardBackStyle, backgroundColor: primary, color: primaryText }}>
            {props.spectrumCard[0]}
          </div>
          <div style={{ ...cardBackStyle, backgroundColor: secondary, color: secondaryText }}>
            {props.spectrumCard[1]}
          </div>
        </CenteredRow>
        <div style={{ padding: "16px 32px" }}>
          <Slider
            min={0}
            max={20}
            value={props.handleValue}
            trackStyle={{
              backgroundColor: "transparent",
            }}
            railStyle={{
              background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`,
              height: 8,
            }}
            handleStyle={handleStyle}
            onChange={props.onChange}
            marks={marks}
            dotStyle={dotStyle}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}

function getStringHash(value: string) {
  let acc = 0;
  for (let i = 0; i < value.length; i++) {
    acc += value.charCodeAt(i);
  }
  return acc;
}

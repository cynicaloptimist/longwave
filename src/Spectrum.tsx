import React from "react";
import Slider from "rc-slider";
import { Column, Row } from "./LayoutElements";
const ColorScheme: any = require("color-scheme");

export function Spectrum(props: {
  spectrumCard: [string, string];
  handleValue?: number;
  targetValue?: number;
  onChange?: (newValue: number) => void;
}) {
  const scheme = new ColorScheme();
  scheme
    .from_hue(getStringHash(props.spectrumCard[0]))
    .scheme("contrast")
    .variation("soft");
  const [primary, , , , secondary]: string[] = scheme.colors();
  const cardBackStyle: React.CSSProperties = {
    padding: 8,
    fontWeight: "bold",
  };

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
      label: "Target",
    };
  }

  return (
    <div style={{ padding: 4 }}>
      <Column style={{ alignItems: "stretch" }}>
        <Row style={{ justifyContent: "space-between" }}>
          <div style={{ ...cardBackStyle, backgroundColor: "#" + primary }}>
            {props.spectrumCard[0]}
          </div>
          <div style={{ ...cardBackStyle, backgroundColor: "#" + secondary }}>
            {props.spectrumCard[1]}
          </div>
        </Row>
        <div style={{ padding: 16 }}>
          <Slider
            min={1}
            max={21}
            value={props.handleValue}
            trackStyle={{
              backgroundColor: "transparent",
            }}
            railStyle={{
              background: `linear-gradient(90deg, #${primary} 0%, #${secondary} 100%)`,
              height: 8,
            }}
            handleStyle={handleStyle}
            onChange={props.onChange}
            marks={marks}
            dotStyle={dotStyle}
          />
        </div>
      </Column>
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

import React from "react";
import Slider from "rc-slider";
import { Column, Row } from "./LayoutElements";
const ColorScheme: any = require("color-scheme");

export function Spectrum(props: {
  target: number;
  spectrumCard: [string, string];
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

  return (
    <div style={{ padding: 4 }}>
      <Column style={{ alignItems: "stretch" }}>
        <Slider
          min={1}
          max={21}
          value={props.target}
          trackStyle={{
            backgroundColor: "transparent",
          }}
          railStyle={{
            background: `linear-gradient(90deg, #${primary} 0%, #${secondary} 100%)`,
            height: 8,
          }}
          handleStyle={{
            height: 18,
            width: 18,
            cursor: "auto",
            backgroundColor: "white",
            borderColor: "black",
          }}
        />
        <Row style={{ justifyContent: "space-between" }}>
          <div style={{ ...cardBackStyle, backgroundColor: "#" + primary }}>
            {props.spectrumCard[0]}
          </div>
          <div style={{ ...cardBackStyle, backgroundColor: "#" + secondary }}>
            {props.spectrumCard[1]}
          </div>
        </Row>
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

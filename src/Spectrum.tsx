import React from "react";
import Slider from "rc-slider";
const ColorScheme: any = require("color-scheme");

export function Spectrum(props: { target: number }) {
  const scheme = new ColorScheme();
  scheme.from_hue(21).scheme("contrast").variation("soft");
  const [primary, , , , secondary]: string[] = scheme.colors();

  return (
    <div style={{ padding: 4 }}>
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
    </div>
  );
}

import React from "react";
import Slider from "rc-slider";

export function Spectrum(props: { target: number }) {
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
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
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

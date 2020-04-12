import React from "react";

export function CommonFooter() {
  return (
    <div
      style={{
        margin: 8,
        paddingTop: 8,
        borderTop: "1px solid black",
        color: "gray",
        fontSize: "small",
      }}
    >
      <a
        href="https://www.wavelength.zone/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wavelength
      </a>{" "}
      is designed by Wolfgang Warsch, Alex Hague, and Justin Vickers. Adapted
      for web by Evan Bailey and Margarethe Schoen.
    </div>
  );
}

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
      <Link href="https://www.wavelength.zone/" text="Wavelength" /> is designed
      by Wolfgang Warsch, Alex Hague, and Justin Vickers.{" "}
      <Link
        href="https://github.com/cynicaloptimist/longwave"
        text="Adapted for web"
      />{" "}
      by Evan Bailey and Margarethe Schoen.
    </div>
  );
}

function Link(props: { href: string; text: string }) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
}

import React, { useState, useEffect } from "react";

export function Animate(props: {
  children: React.ReactNode;
  animation: "wipe-reveal-right" | "fade-disappear-up";
  style?: React.CSSProperties;
}) {
  const [className, setClassName] = useState<string>(props.animation);

  useEffect(() => {
    setTimeout(() => {
      return setClassName(props.animation + " animate");
    });
  });

  return (
    <div className={className} style={props.style}>
      {props.children}
    </div>
  );
}

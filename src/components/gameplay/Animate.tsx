import React, { useState, useEffect } from "react";

export function Animate(props: {
  children: React.ReactNode;
  animation: "wipe-reveal-right";
}) {
  const [className, setClassName] = useState<string>(props.animation);
  useEffect(() => {
    setTimeout(() => {
      return setClassName(className + " animate");
    });
  });
  return <div className={className}>{props.children}</div>;
}

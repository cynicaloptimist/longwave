import React, { useState, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export function IconButton(props: {
  icon: IconDefinition;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const style: CSSProperties = { cursor: "pointer", padding: 8 };
  
  if (isHovered) {
    style.color = "black";
  }

  return (
    <FontAwesomeIcon
      style={style}
      icon={props.icon}
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}

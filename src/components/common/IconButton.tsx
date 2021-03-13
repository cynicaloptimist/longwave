import React, { useState, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export function IconButton(props: {
  icon: IconDefinition;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const style: CSSProperties = { cursor: "pointer", margin: 4, padding: 4 };

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

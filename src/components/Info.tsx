import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { ReactElement } from "react";

export function Info(props: { children: string | ReactElement<any> }) {
  return (
    <Tippy content={props.children} placement="bottom">
      <div style={{ margin: 8 }}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
    </Tippy>
  );
}

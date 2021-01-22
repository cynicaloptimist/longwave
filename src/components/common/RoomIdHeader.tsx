import React from "react";
import { useParams } from "react-router-dom";
import { CenteredRow } from "./LayoutElements";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { InitialGameState } from "../../state/GameState";

export function RoomIdHeader() {
  const { roomId }: {[k: string]: any} = useParams();

  return (
    <CenteredRow
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        color: "gray",
      }}
    >
      <div style={{ margin: 4, padding: 4 }}>Room ID: {roomId}</div>
      <Tippy content={<RoomMenu />} interactive placement="bottom-end">
        <div tabIndex={0} style={{ padding: 8 }}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </Tippy>
    </CenteredRow>
  );
}

function RoomMenu() {
  const { setGameState } = useContext(GameModelContext);

  return (
    <div
      tabIndex={0}
      style={{ cursor: "pointer" }}
      onClick={() => setGameState(InitialGameState())}
    >
      Reset Room
    </div>
  );
}

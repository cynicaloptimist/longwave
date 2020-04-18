import React from "react";
import { useParams } from "react-router-dom";
import { CenteredRow } from "./LayoutElements";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./IconButton";

export function RoomIdHeader() {
  const { roomId } = useParams();

  return (
    <CenteredRow
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        color: "gray",
      }}
    >
      <div>Room ID: {roomId}</div>
      <IconButton icon={faEllipsisV} onClick={() => alert("")} />
    </CenteredRow>
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import { CenteredRow } from "./LayoutElements";

export function RoomIdHeader() {
  const { roomId } = useParams();
  return (
    <CenteredRow
      style={{
        justifyContent: "flex-end",
        color: "gray",
      }}
    >
      Room ID: {roomId}
    </CenteredRow>
  );
}

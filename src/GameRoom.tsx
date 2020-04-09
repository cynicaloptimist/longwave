import { useParams } from "react-router-dom";
import React from "react";

export function GameRoom() {
  const { roomId } = useParams();
  return <div>{roomId || "Room Id missing"}</div>;
}

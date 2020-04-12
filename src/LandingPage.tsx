import React from "react";
import { useHistory } from "react-router-dom";
import { randomFourCharacterString } from "./randomFourCharacterString";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";

export function LandingPage() {
  const history = useHistory();
  return (
    <CenteredColumn>
      <Button
        text="Create Room"
        onClick={() => {
          history.push("/" + randomFourCharacterString());
        }}
      />
    </CenteredColumn>
  );
}

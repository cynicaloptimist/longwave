import React from "react";
import { useHistory } from "react-router-dom";
import { RandomFourCharacterString } from "../state/RandomFourCharacterString";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";
import { Title } from "./Title";

export function LandingPage() {
  const history = useHistory();
  return (
    <CenteredColumn>
      <Title />
      <Button
        text="Create Room"
        onClick={() => {
          history.push("/" + RandomFourCharacterString());
        }}
      />
    </CenteredColumn>
  );
}

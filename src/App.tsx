import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { GameRoom } from "./GameRoom";
import { randomFourCharacterString } from "./randomFourCharacterString";
import { CenteredColumn } from "./LayoutElements";
import { Button } from "./Button";

const style: React.CSSProperties = {
  maxWidth: 500,
  height: "100%",
  margin: "4px auto",
  padding: 4,
  border: "1px solid black",
};

function App() {
  return (
    <div style={style}>
      <BrowserRouter>
        <Switch>
          <Route path="/:roomId">
            <GameRoom />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
        <div
          style={{
            margin: 8,
            paddingTop: 8,
            borderTop: "1px solid black",
            color: "gray",
            fontSize: "small"
          }}
        >
          <a href="https://www.wavelength.zone/" target="_blank">
            Wavelength
          </a>{" "}
          is designed by Wolfgang Warsch, Alex Hague, and Justin Vickers.
          Adapted for web by Evan Bailey and Margarethe Schoen.
        </div>
      </BrowserRouter>
    </div>
  );
}

function LandingPage() {
  const history = useHistory();
  return (
    <CenteredColumn>
      <Button
        text="Start Game"
        onClick={() => {
          history.push("/" + randomFourCharacterString());
        }}
      />
    </CenteredColumn>
  );
}

export default App;

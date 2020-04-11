import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { GameRoom } from "./GameRoom";
import { randomFourCharacterString } from "./randomFourCharacterString";
import { Column } from "./LayoutElements";
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
      </BrowserRouter>
    </div>
  );
}

function LandingPage() {
  const history = useHistory();
  return (
    <Column>
      <Button
        text="Start Game"
        onClick={() => {
          history.push("/" + randomFourCharacterString());
        }}
      />
    </Column>
  );
}

export default App;

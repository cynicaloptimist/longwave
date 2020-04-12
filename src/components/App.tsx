import React from "react";
import "../App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameRoom } from "./GameRoom";
import { CenteredColumn } from "./LayoutElements";
import { CommonFooter } from "./CommonFooter";
import { LandingPage } from "./LandingPage";

const style: React.CSSProperties = {
  maxWidth: 500,
  margin: 4,
  padding: 4,
  border: "1px solid black",
};

function App() {
  return (
    <CenteredColumn>
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
          <CommonFooter />
        </BrowserRouter>
      </div>
    </CenteredColumn>
  );
}

export default App;

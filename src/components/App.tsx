import React from 'react';
import "../App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameRoom } from "./gameplay/GameRoom";
import { CenteredColumn } from "./common/LayoutElements";
import { CommonFooter } from "./common/CommonFooter";
import { LandingPage } from "./common/LandingPage";
import { NotFoundPage } from "./common/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <CenteredColumn>
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/:roomId" component={GameRoom} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
          <CommonFooter />
        </div>
        
      </CenteredColumn>
    </BrowserRouter>
  );
}

export default App;

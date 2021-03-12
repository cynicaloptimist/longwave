//import React, {Suspense} from 'react';
import '../App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameRoom } from "./gameplay/GameRoom";
import { CenteredColumn } from "./common/LayoutElements";
import { CommonFooter } from "./common/CommonFooter";
import { LandingPage } from "./common/LandingPage";

import {useTranslation} from "react-i18next";

import ReactFlagsSelect from 'react-flags-select';

const style: React.CSSProperties = {
  maxWidth: 500,
  margin: 4,
  padding: 4,
  border: "1px solid black",
};

function App() {
  const {t, i18n} = useTranslation ();

  const changeLanguage = (language: string | undefined) => {
    i18n.changeLanguage(language);
  };
  
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
      <div>
      <br />
      <button className="lngbtn lngbtnblue" onClick={() => changeLanguage("en")}>EN</button>
      <button className="lngbtn lngbtnblue" onClick={() => changeLanguage("de")}>DE</button>
      </div>
      
    </CenteredColumn>
  );
}

export default App;

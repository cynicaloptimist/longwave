import React from "react";
import { useHistory } from "react-router-dom";
import { RandomFourCharacterString } from "../../state/RandomFourCharacterString";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { Button } from "./Button";
import { LongwaveAppTitle } from "./Title";

import { useTranslation } from "react-i18next";

export function LandingPage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string | undefined) => {
    i18n.changeLanguage(language);
  };

  const history = useHistory();
  return (
    <CenteredColumn>
      <LongwaveAppTitle />
      <Button
        text={t("landingpage.create_room")}
        onClick={() => {
          history.push("/" + RandomFourCharacterString());
        }}
      />
      <p style={{ margin: 8 }}>
        <strong>{t("landingpage.longwave")}</strong>
        {t("landingpage.adaptation")} <em>{t("landingpage.wavelength")}</em>.{" "}
        {t("landingpage.best_enjoyewd")}
      </p>
      <CenteredRow style={{ alignSelf: "flex-end" }}>
        <Button onClick={() => changeLanguage("en")} text="EN" />
        <Button onClick={() => changeLanguage("de")} text="DE" />
      </CenteredRow>
    </CenteredColumn>
  );
}

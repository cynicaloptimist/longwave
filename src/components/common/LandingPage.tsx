import { useHistory } from "react-router-dom";
import { RandomFourCharacterString } from "../../state/RandomFourCharacterString";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { Button } from "./Button";
import { LongwaveAppTitle } from "./Title";

import { useTranslation } from "react-i18next";
import { allLanguages } from "../../i18n";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tippy";

export function LandingPage() {
  const { t } = useTranslation();

  const history = useHistory();
  return (
    <CenteredColumn>
      <LongwaveAppTitle />
      <CenteredRow>
        <Button
          text={t("landingpage.create_room")}
          onClick={() => {
            history.push("/" + RandomFourCharacterString());
          }}
        />
        <LanguageMenu />
      </CenteredRow>
      <p style={{ margin: 8 }}>
        <strong>{t("landingpage.longwave")}</strong>{" "}
        {t("landingpage.adaptation")} <em>{t("landingpage.wavelength")}</em>.{" "}
        {t("landingpage.best_enjoyed")}
      </p>
    </CenteredColumn>
  );
}

function LanguageMenu() {
  return (
    <Tooltip
      interactive
      position="bottom"
      sticky
      tabIndex={0}
      html={<Languages />}
    >
      <FontAwesomeIcon size="lg" icon={faLanguage} />
    </Tooltip>
  );
}

function Languages() {
  const { i18n } = useTranslation();

  return (
    <CenteredColumn
      style={{
          padding= "1rem 0"
          border-top= "1px solid #eaeaea"
          text-align= "center"
      }}
    >
      {allLanguages.map((language) => {
        return (
          <div
            key={language}
            style={{ cursor: "pointer" }}
            tabIndex={0}
            onClick={() => {
              i18n.changeLanguage(language);
            }}
          >
            {language}
          </div>
        );
      })}
    </CenteredColumn>
  );
}

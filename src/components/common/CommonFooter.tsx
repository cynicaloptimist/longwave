import { useTranslation } from "react-i18next";
import { CenteredRow } from "./LayoutElements";

export function CommonFooter() {
  const { t } = useTranslation();

  return (
    <CenteredRow
      style={{
        paddingTop: 8,
        borderTop: "1px solid black",
        color: "gray",
        fontSize: "small",
      }}
    >
      <p style={{ margin: 8 }}>
        <Link href="https://www.wavelength.zone" text="Wavelength" />{" "}
        {t("commonfooter.developed_by")}{" "}
        <Link
          href="https://github.com/cynicaloptimist/longwave"
          text={t("commonfooter.adapted_for_web")}
        />{" "}
        {t("commonfooter.adapted_for_web_by")}
      </p>
      {/* we want referrer, so: */}
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a target="_blank" href="https://www.patreon.com/improvedinitiative">
        <img
          alt="Patreon logo"
          title={t("commonfooter.support_patreon")}
          src="./Digital-Patreon-Wordmark_FieryCoral.png"
          style={{ width: "150px", margin: 8 }}
        />
      </a>
    </CenteredRow>
  );
}

function Link(props: { href: string; text: string }) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
}

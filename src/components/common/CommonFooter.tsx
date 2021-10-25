import { useTranslation } from "react-i18next";
import { CenteredColumn, CenteredRow } from "./LayoutElements";

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
      <CenteredColumn>
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
      </CenteredColumn>
      <AffiliateLink />
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

function AffiliateLink() {
  return (
    /* eslint-disable-next-line react/jsx-no-target-blank */
    <a
      target="_blank"
      href="https://www.amazon.com/gp/product/B07T446163/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B07T446163&linkCode=as2&tag=cynicalopti09-20&linkId=0bb4d74ae01b9f1846ae6c8797ef1a47"
    >
      <img
        alt="Longwave board game on Amazon"
        src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B07T446163&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL110_&tag=cynicalopti09-20"
      />
    </a>
  );
}

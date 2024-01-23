import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../App.css';

export function CommonFooter() {
  const { t } = useTranslation();

  return (
    <div className="footer-container">
      <div className="footer-content">
        <Link href="https://www.wavelength.zone" text="Wavelength" />
        {' ' + t('commonfooter.developed_by') + ' '}
        <Link
          href="https://github.com/cynicaloptimist/longwave"
          text={t('commonfooter.adapted_for_web')}
        />
        {' ' + t('commonfooter.adapted_for_web_by')}
      </div>
      {/* we want referrer noopener and noreferrer, so: */}
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a
        target="_blank"
        href="https://www.patreon.com/improvedinitiative"
        rel="noopener noreferrer"
      >
        <img
          alt={t('commonfooter.support_patreon')}
          title={t('commonfooter.support_patreon')}
          src="./Digital-Patreon-Wordmark_FieryCoral.png"
          className="patreon-logo"
        />
      </a>
    </div>
  );
}

function Link({ href, text }: { href: string; text: string }) {
  // Refactored the Link function as an arrow function for consistency and destructured the props.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

export default CommonFooter;

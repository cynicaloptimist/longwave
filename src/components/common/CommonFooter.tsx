import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../App.css';

export function CommonFooter() {
  const { t } = useTranslation();

  return (
    <div className="footer-container">
      <div className="footer-content">
        <Link href="https://www.wavelength.zone" text="Wavelength" />
        {` ${t('commonfooter.developed_by')} `}
        <Link
          href="https://github.com/cynicaloptimist/longwave"
          text={t('commonfooter.adapted_for_web')}
        />
        {' '} 
        {t('commonfooter.adapted_for_web_by')}
      </div>
      {/* Use proper alt text passing */}
      <a
        target="_blank"
        href="https://www.patreon.com/improvedinitiative"
        rel="noopener noreferrer"
        aria-label={t('commonfooter.support_patreon')} // Use aria-label for accessibility
      >
        <img
          alt={t('commonfooter.support_patreon')}
          src="./Digital-Patreon-Wordmark_FieryCoral.png"
          className="patreon-logo"
        />
      </a>
    </div>
  );
};

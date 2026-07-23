import { Fragment } from 'react';

import { METADATA } from '@/constants/metadata';

import * as styles from './styles.css';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <p className={styles.license}>
        {METADATA.footer.address}{' '}
        {METADATA.footer.locations.map((location, index) => {
          const tooltipId = `footer-location-${index}`;

          return (
            <Fragment key={location.room}>
              {index > 0 && ' · '}
              <span className={styles.location}>
                <button
                  type="button"
                  className={styles.locationTrigger}
                  aria-describedby={tooltipId}
                >
                  {location.room}
                </button>
                <span id={tooltipId} role="tooltip" className={styles.locationTooltip}>
                  {location.organization}
                </span>
              </span>
            </Fragment>
          );
        })}{' '}
        |&nbsp;
        <a href={`mailto:${METADATA.email}`}>{METADATA.email}</a>
        <br />© GDG on Campus HUFS. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;

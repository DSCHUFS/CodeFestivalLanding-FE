import { clsx } from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

import CIShape from '@/components/common/CIShape';
import ScrollDownIndicator from '@/components/common/ScrollDownIndicator';
import { FESTIVAL } from '@/constants/menu';

import * as styles from './styles.css';

const Dashboard = () => {
  const currentTime = new Date();
  const registrationDeadline = new Date(FESTIVAL.current.registrationDeadline);
  const registrationClosed = currentTime > registrationDeadline;
  const registrationLink = FESTIVAL.current.registrationLink;
  const competitionDate = new Date(FESTIVAL.current.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Fragment>
      <div className={styles.background}>
        <Image src="/static/images/bg.webp" alt="background" quality={100} fill preload />
        <div className={styles.backgroundGradient} />
        <ScrollDownIndicator />
      </div>
      <section className={styles.root}>
        <h1 className={styles.branding}>HUFS CodeFestival</h1>
        <p className={styles.time}>{competitionDate}</p>
        {!registrationLink ? (
          <span className={clsx(styles.registerLink, styles.registerClosed)}>
            Registration Not Yet Open
          </span>
        ) : registrationClosed ? (
          <span className={clsx(styles.registerLink, styles.registerClosed)}>
            Registration Closed
          </span>
        ) : (
          <a className={styles.registerLink} href={registrationLink} target="_blank">
            Registration
          </a>
        )}
        <p className={styles.souvenir}>소정의 기념품이 제공됩니다</p>
        <div className={styles.ci}>
          <CIShape />
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;

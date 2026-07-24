'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import CIShape from '@/components/common/CIShape';
import ScrollDownIndicator from '@/components/common/ScrollDownIndicator';
import { useCurrentEvent } from '@/contexts/CurrentEventContext';

import * as styles from './styles.css';

const Dashboard = () => {
  const { event, error, loading } = useCurrentEvent();
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const registrationNotOpen =
    event && currentTime < new Date(`${event.registrationOpensAt}+09:00`).getTime();
  const registrationClosed =
    event && currentTime > new Date(`${event.registrationClosesAt}+09:00`).getTime();
  const eventEnded =
    event && currentTime > new Date(`${event.eventDate}T23:59:59.999+09:00`).getTime();
  const competitionDate = event
    ? new Date(`${event.eventDate}T00:00:00+09:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'To Be Announced';

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <div className={styles.background}>
        <Image src="/static/images/bg.webp" alt="background" quality={100} fill preload />
        <div className={styles.backgroundGradient} />
        <ScrollDownIndicator />
      </div>
      <section className={styles.root}>
        <h1 className={styles.branding}>HUFS CodeFestival</h1>
        {loading ? (
          <span className={styles.timeSkeleton} aria-hidden />
        ) : (
          <p className={styles.time}>{competitionDate}</p>
        )}
        {loading ? (
          <span className={styles.registerSkeleton} aria-hidden />
        ) : !event && error ? (
          <span className={clsx(styles.registerLink, styles.registerClosed)}>
            Registration Unavailable
          </span>
        ) : !event || registrationNotOpen ? (
          <span className={clsx(styles.registerLink, styles.registerClosed)}>
            Registration Not Yet Open
          </span>
        ) : eventEnded ? (
          <span className={clsx(styles.registerLink, styles.registerClosed)}>
            Registration Closed
          </span>
        ) : registrationClosed ? (
          <Link className={styles.registerLink} href="/apply">
            View Application
          </Link>
        ) : (
          <Link className={styles.registerLink} href="/apply">
            Registration
          </Link>
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

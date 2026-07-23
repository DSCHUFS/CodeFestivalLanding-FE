'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCurrentEvent } from '@/contexts/CurrentEventContext';

import * as styles from './styles.css';

const Intro = () => {
  const { event, loading } = useCurrentEvent();

  return (
    <section>
      <h2 className={styles.title}>INTRO</h2>
      <p className={styles.description}>
        HUFS’s largest algorithm competition, Code Festival, will be held on November 28.
        <br />
        Participants can join either the Beginner Track or the Challenger Track. Both tracks solve
        the same problem set. The Beginner Track focuses on learning and participation, while the
        Challenger Track offers awards and prizes for top performers.
        <br />
        It’s a great opportunity to challenge yourself and improve your skills.
        <br />
      </p>
      {loading ? (
        <span className={styles.directLinkSkeleton} aria-hidden />
      ) : event ? (
        <Link className={styles.directLink} href={`/festival/${encodeURIComponent(event.edition)}`}>
          {event.title}
          <Image
            src="/static/icons/ic_arrow_right_alt_24dp.svg"
            alt="navigate"
            width={24}
            height={24}
          />
        </Link>
      ) : (
        <span className={styles.directLinkPlaceholder} aria-hidden />
      )}
    </section>
  );
};

export default Intro;

import Image from 'next/image';
import Link from 'next/link';

import { FESTIVAL } from '@/constants/menu';

import * as styles from './styles.css';

const Intro = () => {
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
      <Link className={styles.directLink} href={FESTIVAL.current.href}>
        {FESTIVAL.current.title}
        <Image
          src="/static/icons/ic_arrow_right_alt_24dp.svg"
          alt="navigate"
          width={24}
          height={24}
        />
      </Link>
    </section>
  );
};

export default Intro;

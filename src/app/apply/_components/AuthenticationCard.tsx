import { clsx } from 'clsx';
import Image from 'next/image';

import { beginCodeFestivalLogin } from '@/services/api';
import * as styles from '@/styles/application.css';

const AuthenticationCard = () => (
  <section className={clsx(styles.card, styles.authCard)}>
    <h2 className={styles.describedCardTitle}>본인 인증</h2>
    <p className={styles.cardDescription}>참가 신청을 위해 HUFS 이메일 인증이 필요합니다.</p>
    <div className={clsx(styles.actions, styles.authActions)}>
      <button
        type="button"
        className={clsx(styles.button, styles.authButton)}
        onClick={() => beginCodeFestivalLogin()}
      >
        <Image src="/static/icons/google.svg" alt="" width={18} height={18} aria-hidden />
        HUFS 이메일로 로그인
      </button>
    </div>
  </section>
);

export default AuthenticationCard;

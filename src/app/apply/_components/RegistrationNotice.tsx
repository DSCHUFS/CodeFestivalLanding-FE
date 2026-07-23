import * as styles from '@/styles/application.css';
import { CodeFestivalEvent } from '@/types/application';
import { formatCodeFestivalDate } from '@/utils/application';

type RegistrationNoticeProps = {
  event: CodeFestivalEvent;
};

const RegistrationNotice = ({ event }: RegistrationNoticeProps) => {
  const registrationNotOpen = new Date() < new Date(`${event.registrationOpensAt}+09:00`);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>
        {registrationNotOpen ? '참가 신청 전입니다.' : '참가 신청이 마감되었습니다.'}
      </h2>
      <p className={styles.description}>
        {registrationNotOpen
          ? `참가 신청은 ${formatCodeFestivalDate(event.registrationOpensAt)}부터 가능합니다.`
          : '이번 대회의 참가 신청 접수가 종료되었습니다.'}
      </p>
    </section>
  );
};

export default RegistrationNotice;

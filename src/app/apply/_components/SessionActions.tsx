import Link from 'next/link';

import * as styles from '@/styles/application.css';

type SessionActionsProps = {
  email: string;
  admin: boolean;
  submitting: boolean;
  onLogout: () => void;
};

const SessionActions = ({ email, admin, submitting, onLogout }: SessionActionsProps) => (
  <div className={styles.sessionActions}>
    <span>{email}</span>
    {admin && (
      <Link className={styles.textButton} href="/admin">
        관리자 페이지
      </Link>
    )}
    <button className={styles.textButton} type="button" onClick={onLogout} disabled={submitting}>
      로그아웃
    </button>
  </div>
);

export default SessionActions;

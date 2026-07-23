'use client';

import { clsx } from 'clsx';
import { useEffect } from 'react';

import * as styles from './styles.css';

type FeedbackToastProps = {
  message: string;
  tone?: 'default' | 'error';
  onDismiss: () => void;
};

const FeedbackToast = ({ message, tone = 'default', onDismiss }: FeedbackToastProps) => {
  useEffect(() => {
    if (tone === 'error') {
      return;
    }

    const timeout = window.setTimeout(onDismiss, 4000);
    return () => window.clearTimeout(timeout);
  }, [onDismiss, tone]);

  return (
    <div
      className={clsx(styles.toast, tone === 'error' && styles.toastError)}
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
    >
      <span className={styles.toastMessage}>{message}</span>
      <button
        className={styles.toastClose}
        type="button"
        aria-label="알림 닫기"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
  );
};

export default FeedbackToast;

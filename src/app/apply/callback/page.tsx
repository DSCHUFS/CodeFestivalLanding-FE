'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import Layout from '@/components/common/Layout';
import { consumeLoginReturnTo, exchangeLoginCode, validateLoginState } from '@/services/api';
import * as styles from '@/styles/application.css';

export default function ApplyCallbackPage() {
  return (
    <Suspense fallback={<CallbackStatus />}>
      <ApplyCallback />
    </Suspense>
  );
}

const ApplyCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>();
  const loginStarted = useRef(false);

  useEffect(() => {
    if (loginStarted.current) {
      return;
    }
    loginStarted.current = true;

    const completeLogin = async () => {
      const state = searchParams.get('state');
      const code = searchParams.get('code');
      const loginError = searchParams.get('error');

      if (!state || !validateLoginState(state)) {
        setError('로그인 요청을 확인할 수 없습니다. 다시 인증해 주세요.');
        return;
      }
      if (loginError === 'ineligible_member') {
        setError('현재 계정은 코드페스티벌 참가 자격을 충족하지 않습니다.');
        return;
      }
      if (!code) {
        setError('인증 코드를 전달받지 못했습니다. 다시 인증해 주세요.');
        return;
      }
      const loginCode = code;

      try {
        await exchangeLoginCode(loginCode);
        router.replace(consumeLoginReturnTo());
      } catch (exchangeError) {
        setError(
          exchangeError instanceof Error ? exchangeError.message : '인증을 완료하지 못했습니다.',
        );
      }
    };

    void completeLogin();
  }, [router, searchParams]);

  return (
    <Layout className={styles.root}>
      <section className={error ? styles.error : styles.notice}>
        <p>{error ?? '불러오는 중...'}</p>
        {error && (
          <div className={styles.actions}>
            <button
              className={styles.button}
              type="button"
              onClick={() => router.replace('/apply')}
            >
              신청 페이지로 돌아가기
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

const CallbackStatus = () => (
  <Layout className={styles.root}>
    <p className={styles.notice}>재학생 인증을 완료하는 중입니다.</p>
  </Layout>
);

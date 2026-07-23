'use client';

import { FormEvent, useEffect, useState } from 'react';

import FeedbackToast from '@/components/common/FeedbackToast';
import Layout from '@/components/common/Layout';
import {
  cancelApplication,
  CodeFestivalApiError,
  createApplication,
  endCodeFestivalSession,
  getAccessToken,
  getCurrentEvent,
  getCurrentMember,
  getMyApplication,
  updateApplication,
} from '@/services/api';
import * as styles from '@/styles/application.css';
import {
  CodeFestivalApplication,
  CodeFestivalApplicationRequest,
  CodeFestivalEvent,
  CodeFestivalMember,
} from '@/types/application';

import ApplicationForm from './_components/ApplicationForm';
import ApplicationSkeleton from './_components/ApplicationSkeleton';
import ApplicationSummary from './_components/ApplicationSummary';
import AuthenticationCard from './_components/AuthenticationCard';
import EventOverview from './_components/EventOverview';
import RegistrationNotice from './_components/RegistrationNotice';
import SessionActions from './_components/SessionActions';

const applicationRequest = (form: HTMLFormElement): CodeFestivalApplicationRequest => {
  const data = new FormData(form);
  return {
    phoneNumber: String(data.get('phoneNumber')),
    affiliatedCampus: String(data.get('affiliatedCampus')),
    studentNumber: String(data.get('studentNumber')),
    enrollmentStatus: String(data.get('enrollmentStatus')),
    participationCampus: String(data.get('participationCampus')),
    track: String(data.get('track')),
    privacyConsent: data.get('privacyConsent') === 'on',
    rulesConfirmed: data.get('rulesConfirmed') === 'on',
    prizeConfirmed: data.get('prizeConfirmed') === 'on',
    noShowConfirmed: data.get('noShowConfirmed') === 'on',
  };
};

export default function ApplyPage() {
  const [event, setEvent] = useState<CodeFestivalEvent>();
  const [member, setMember] = useState<CodeFestivalMember>();
  const [application, setApplication] = useState<CodeFestivalApplication>();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const handleActionError = (actionError: unknown, fallbackMessage: string) => {
    if (actionError instanceof CodeFestivalApiError && actionError.status === 401) {
      setMember(undefined);
      setApplication(undefined);
      setEditing(false);
      setError(undefined);
      return;
    }

    setError(actionError instanceof Error ? actionError.message : fallbackMessage);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const currentEvent = await getCurrentEvent();
        setEvent(currentEvent);

        if (!getAccessToken()) {
          return;
        }

        const currentMember = await getCurrentMember();
        setMember(currentMember);

        try {
          setApplication(await getMyApplication());
        } catch (applicationError) {
          if (
            !(applicationError instanceof CodeFestivalApiError) ||
            applicationError.code !== 'CF_006'
          ) {
            throw applicationError;
          }
        }
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : '신청 정보를 불러오지 못했습니다.',
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const submit = async (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    setSubmitting(true);
    setError(undefined);

    try {
      const request = applicationRequest(submitEvent.currentTarget);
      const savedApplication = application
        ? await updateApplication(application.id, request)
        : await createApplication(request);
      setApplication(savedApplication);
      setEditing(false);
    } catch (submitError) {
      handleActionError(submitError, '신청서를 저장하지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const cancel = async () => {
    if (
      !application ||
      !window.confirm(
        '참가 신청을 취소하면 관리자에게 문의해야만 복구할 수 있습니다. 정말 취소하시겠습니까?',
      )
    ) {
      return;
    }

    setSubmitting(true);
    setError(undefined);
    try {
      setApplication(await cancelApplication(application.id));
      setEditing(false);
    } catch (cancelError) {
      handleActionError(cancelError, '신청을 취소하지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      await endCodeFestivalSession();
      setMember(undefined);
      setApplication(undefined);
      setEditing(false);
    } catch (logoutError) {
      handleActionError(logoutError, '로그아웃하지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout className={styles.root}>
      {loading && <ApplicationSkeleton />}
      {!loading && error && !event && <p className={styles.error}>{error}</p>}

      {event && (
        <>
          <EventOverview event={event} />

          {!member && <AuthenticationCard />}

          {member && application && (!editing || !event.registrationOpen) && (
            <ApplicationSummary
              event={event}
              application={application}
              submitting={submitting}
              onEdit={() => setEditing(true)}
              onCancel={cancel}
            />
          )}

          {member && event.registrationOpen && (!application || editing) && (
            <ApplicationForm
              key={application?.id ?? 'new'}
              event={event}
              member={member}
              application={application}
              submitting={submitting}
              onSubmit={submit}
              onCancelEdit={() => setEditing(false)}
            />
          )}

          {member && !application && !event.registrationOpen && (
            <RegistrationNotice event={event} />
          )}

          {member && (
            <SessionActions
              email={member.email}
              admin={member.admin}
              submitting={submitting}
              onLogout={logout}
            />
          )}

          {error && (
            <FeedbackToast message={error} tone="error" onDismiss={() => setError(undefined)} />
          )}
        </>
      )}
    </Layout>
  );
}

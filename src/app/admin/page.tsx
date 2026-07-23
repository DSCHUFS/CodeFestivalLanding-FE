'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import FeedbackToast from '@/components/common/FeedbackToast';
import Layout from '@/components/common/Layout';
import { useCurrentEvent } from '@/contexts/CurrentEventContext';
import {
  beginCodeFestivalLogin,
  CodeFestivalApiError,
  createEvent,
  deleteEvent,
  endCodeFestivalSession,
  getAccessToken,
  getAdminApplications,
  getAdminEvents,
  getCurrentMember,
  updateEvent,
  updateApplicationStatuses,
} from '@/services/api';
import * as codeFestivalStyles from '@/styles/application.css';
import * as pageStyles from '@/styles/page.css';
import {
  CodeFestivalApplication,
  CodeFestivalApplicationStatus,
  CodeFestivalEvent,
  CodeFestivalEventRequest,
  CodeFestivalMember,
} from '@/types/application';

import ApplicationsPanel from './_components/ApplicationsPanel';
import EventSettingsForm from './_components/EventSettingsForm';
import * as styles from './page.css';

type AdminTab = 'applications' | 'settings';

export default function CodeFestivalAdminPage() {
  const { refresh: refreshCurrentEvent } = useCurrentEvent();
  const [member, setMember] = useState<CodeFestivalMember>();
  const [events, setEvents] = useState<CodeFestivalEvent[]>([]);
  const [event, setEvent] = useState<CodeFestivalEvent>();
  const [applications, setApplications] = useState<CodeFestivalApplication[]>([]);
  const [tab, setTab] = useState<AdminTab>('applications');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();

  const handleActionError = (actionError: unknown, fallbackMessage: string) => {
    if (actionError instanceof CodeFestivalApiError && actionError.status === 401) {
      setMember(undefined);
      setEvents([]);
      setEvent(undefined);
      setApplications([]);
      setError(undefined);
      setNotice(undefined);
      return;
    }

    setError(actionError instanceof Error ? actionError.message : fallbackMessage);
  };

  useEffect(() => {
    const load = async () => {
      if (!getAccessToken()) {
        setLoading(false);
        return;
      }

      try {
        const currentMember = await getCurrentMember();
        setMember(currentMember);
        if (!currentMember.admin) {
          return;
        }

        const adminEvents = await getAdminEvents();
        setEvents(adminEvents);
        const initialEvent = adminEvents.find(candidate => candidate.active) ?? adminEvents[0];
        if (initialEvent) {
          setEvent(initialEvent);
          setApplications(await getAdminApplications(initialEvent.edition));
        } else {
          setTab('settings');
        }
      } catch (loadError) {
        if (loadError instanceof CodeFestivalApiError && loadError.status === 401) {
          setMember(undefined);
        } else {
          setError(
            loadError instanceof Error ? loadError.message : '관리자 정보를 불러오지 못했습니다.',
          );
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const changeStatuses = async (
    ids: string[],
    nextStatus: CodeFestivalApplicationStatus,
  ): Promise<boolean> => {
    if (!event) {
      return false;
    }

    setSubmitting(true);
    setError(undefined);
    setNotice(undefined);
    try {
      const updatedApplications = await updateApplicationStatuses(event.edition, ids, nextStatus);
      const updatedById = new Map(
        updatedApplications.map(application => [application.id, application]),
      );
      setApplications(current =>
        current.map(application => updatedById.get(application.id) ?? application),
      );
      const [updatedApplication] = updatedApplications;
      setNotice(
        updatedApplications.length === 1 && updatedApplication
          ? `${updatedApplication.name} 신청자의 상태를 변경했습니다.`
          : `${updatedApplications.length}명의 신청 상태를 변경했습니다.`,
      );
      return true;
    } catch (statusError) {
      handleActionError(statusError, '상태를 일괄 변경하지 못했습니다.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const changeStatus = (id: string, nextStatus: CodeFestivalApplicationStatus) => {
    void changeStatuses([id], nextStatus);
  };

  const saveEvent = async (request: CodeFestivalEventRequest) => {
    const wasCreatingEvent = !event;
    setSubmitting(true);
    setError(undefined);
    setNotice(undefined);
    try {
      const savedEvent = event
        ? await updateEvent(event.edition, request)
        : await createEvent(request);
      setEvents(current => {
        const eventExists = current.some(candidate => candidate.edition === savedEvent.edition);
        const updatedEvents = current.map(candidate => {
          if (candidate.edition === savedEvent.edition) {
            return savedEvent;
          }
          return savedEvent.active && candidate.active
            ? { ...candidate, active: false }
            : candidate;
        });
        return eventExists ? updatedEvents : [savedEvent, ...updatedEvents];
      });
      setEvent(savedEvent);
      await refreshCurrentEvent();
      if (wasCreatingEvent) {
        setApplications([]);
      }
      setNotice(wasCreatingEvent ? '새 대회를 생성했습니다.' : '대회 설정을 저장했습니다.');
    } catch (saveError) {
      handleActionError(saveError, '행사 설정을 저장하지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const removeEvent = async (): Promise<boolean> => {
    if (!event) {
      return false;
    }

    const deletedEdition = event.edition;
    setSubmitting(true);
    setError(undefined);
    setNotice(undefined);
    try {
      await deleteEvent(deletedEdition);
      const remainingEvents = events.filter(candidate => candidate.edition !== deletedEdition);
      const nextEvent =
        remainingEvents.find(candidate => candidate.active) ?? remainingEvents.at(0);

      setEvents(remainingEvents);
      setEvent(nextEvent);
      setApplications([]);
      await refreshCurrentEvent();
      setNotice(`제${deletedEdition}회 대회와 참가 신청 정보를 삭제했습니다.`);

      if (nextEvent) {
        try {
          setApplications(await getAdminApplications(nextEvent.edition));
        } catch (loadError) {
          handleActionError(loadError, '다음 대회의 신청자를 불러오지 못했습니다.');
        }
      }

      return true;
    } catch (deleteError) {
      handleActionError(deleteError, '대회를 삭제하지 못했습니다.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const selectEvent = async (edition: string) => {
    const selectedEvent = events.find(candidate => candidate.edition === edition);
    if (!selectedEvent) {
      return;
    }

    setSubmitting(true);
    setError(undefined);
    setNotice(undefined);
    try {
      const selectedApplications = await getAdminApplications(edition);
      setEvent(selectedEvent);
      setApplications(selectedApplications);
    } catch (loadError) {
      handleActionError(loadError, '대회 신청자를 불러오지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const startCreatingEvent = () => {
    setEvent(undefined);
    setApplications([]);
    setTab('settings');
    setError(undefined);
    setNotice(undefined);
  };

  const logout = async () => {
    await endCodeFestivalSession();
    setMember(undefined);
    setEvents([]);
    setEvent(undefined);
    setApplications([]);
  };

  const authenticate = async () => {
    if (member) {
      await logout();
    }
    beginCodeFestivalLogin('/admin');
  };

  if (loading) {
    return (
      <Layout className={codeFestivalStyles.root}>
        <p className={codeFestivalStyles.notice}>불러오는 중...</p>
      </Layout>
    );
  }

  const creatingEvent = !event;

  return (
    <Layout className={styles.root}>
      {member?.admin && (
        <header className={pageStyles.header}>
          <h1 className={pageStyles.title}>관리자 페이지</h1>
          <div className={styles.accountBar}>
            <button className={styles.textButton} type="button" onClick={logout}>
              로그아웃
            </button>
          </div>
        </header>
      )}

      {!member?.admin && (
        <>
          {error && <p className={codeFestivalStyles.error}>{error}</p>}
          <section className={clsx(codeFestivalStyles.card, codeFestivalStyles.authCard)}>
            <h2 className={codeFestivalStyles.cardTitle}>관리자 인증</h2>
            <div className={clsx(codeFestivalStyles.actions, codeFestivalStyles.authActions)}>
              <button
                className={clsx(codeFestivalStyles.button, codeFestivalStyles.authButton)}
                type="button"
                onClick={() => void authenticate()}
              >
                <Image src="/static/icons/google.svg" alt="" width={18} height={18} aria-hidden />
                HUFS 이메일로 로그인
              </button>
            </div>
          </section>
        </>
      )}

      {member?.admin && (
        <>
          <section className={styles.eventManager} aria-label="관리 대회 선택">
            <label className={styles.eventSelector}>
              <span className={styles.eventSelectorLabel}>관리 대회</span>
              <select
                className={styles.filterSelect}
                value={event?.edition ?? ''}
                disabled={submitting}
                onChange={changeEvent => void selectEvent(changeEvent.target.value)}
              >
                {creatingEvent && <option value="">(새 대회 생성)</option>}
                {events.map(candidate => (
                  <option key={candidate.edition} value={candidate.edition}>
                    제{candidate.edition}회 · {candidate.title}
                    {candidate.active ? ' (진행 중)' : ''}
                  </option>
                ))}
              </select>
            </label>
            <button
              className={codeFestivalStyles.secondaryButton}
              type="button"
              disabled={submitting}
              onClick={startCreatingEvent}
            >
              새 대회 생성
            </button>
          </section>

          <nav className={styles.tabs} aria-label="관리자 메뉴">
            <button
              className={tab === 'applications' ? styles.activeTab : styles.tab}
              type="button"
              disabled={!event}
              onClick={() => setTab('applications')}
            >
              신청자 관리
            </button>
            <button
              className={tab === 'settings' ? styles.activeTab : styles.tab}
              type="button"
              onClick={() => setTab('settings')}
            >
              행사 설정
            </button>
          </nav>

          {notice && <FeedbackToast message={notice} onDismiss={() => setNotice(undefined)} />}
          {error && (
            <FeedbackToast message={error} tone="error" onDismiss={() => setError(undefined)} />
          )}

          {tab === 'applications' && event && (
            <ApplicationsPanel
              key={event?.edition}
              event={event}
              applications={applications}
              submitting={submitting}
              onStatusChange={changeStatus}
              onBulkStatusChange={changeStatuses}
            />
          )}

          {tab === 'settings' && (
            <section className={codeFestivalStyles.card}>
              <h2 className={codeFestivalStyles.cardTitle}>
                {creatingEvent ? '새 대회 생성' : `제${event?.edition}회 대회 설정`}
              </h2>
              <EventSettingsForm
                key={event?.edition ?? 'new'}
                event={event}
                submitting={submitting}
                onSave={saveEvent}
                onDelete={removeEvent}
              />
            </section>
          )}
        </>
      )}
    </Layout>
  );
}

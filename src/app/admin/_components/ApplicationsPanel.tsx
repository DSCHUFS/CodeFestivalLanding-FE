import { clsx } from 'clsx';
import { ReactNode, useMemo, useState } from 'react';

import {
  CODE_FESTIVAL_APPLICATION_STATUSES,
  CODE_FESTIVAL_APPLICATION_STATUS_LABELS,
  getCodeFestivalApplicationTransitionLabel,
} from '@/constants/application';
import * as codeFestivalStyles from '@/styles/application.css';
import {
  CodeFestivalApplication,
  CodeFestivalApplicationStatus,
  CodeFestivalEvent,
} from '@/types/application';
import { formatCodeFestivalDate, getCodeFestivalOptionLabel } from '@/utils/application';

import ApplicationTable from './ApplicationTable';
import * as styles from '../page.css';

type ApplicationsPanelProps = {
  event: CodeFestivalEvent;
  applications: CodeFestivalApplication[];
  submitting: boolean;
  onStatusChange: (id: string, status: CodeFestivalApplicationStatus) => void;
  onBulkStatusChange: (ids: string[], status: CodeFestivalApplicationStatus) => Promise<boolean>;
};

const ApplicationsPanel = ({
  event,
  applications,
  submitting,
  onStatusChange,
  onBulkStatusChange,
}: ApplicationsPanelProps) => {
  const [query, setQuery] = useState('');
  const [campus, setCampus] = useState('ALL');
  const [track, setTrack] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<CodeFestivalApplicationStatus | ''>('');

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return applications.filter(application => {
      const matchesQuery =
        !normalizedQuery ||
        [
          application.name,
          application.email,
          application.phoneNumber,
          application.department,
          application.studentNumber,
        ].some(value => value.toLowerCase().includes(normalizedQuery));
      return (
        matchesQuery &&
        (campus === 'ALL' || application.participationCampus === campus) &&
        (track === 'ALL' || application.track === track) &&
        (status === 'ALL' || application.status === status)
      );
    });
  }, [applications, campus, query, status, track]);

  const selectedApplications = applications.filter(application => selectedIds.has(application.id));
  const availableBulkStatuses = CODE_FESTIVAL_APPLICATION_STATUSES.filter(nextStatus =>
    selectedApplications.every(application => application.availableStatuses.includes(nextStatus)),
  );
  const bulkStatusAvailable = bulkStatus !== '' && availableBulkStatuses.includes(bulkStatus);

  const toggleSelection = (id: string, selected: boolean) => {
    setBulkStatus('');
    setSelectedIds(current => {
      const next = new Set(current);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const toggleAll = (selected: boolean) => {
    setBulkStatus('');
    setSelectedIds(current => {
      const next = new Set(current);
      filteredApplications.forEach(application => {
        if (selected) {
          next.add(application.id);
        } else {
          next.delete(application.id);
        }
      });
      return next;
    });
  };

  const applyBulkStatus = async () => {
    if (!bulkStatusAvailable || selectedIds.size === 0) {
      return;
    }
    if (await onBulkStatusChange([...selectedIds], bulkStatus)) {
      setSelectedIds(new Set());
      setBulkStatus('');
    }
  };

  return (
    <section className={codeFestivalStyles.card}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={codeFestivalStyles.cardTitle}>신청자</h2>
          <p className={codeFestivalStyles.description}>
            전체 {applications.length}명 / 현재 표시 {filteredApplications.length}명
          </p>
        </div>
        <button
          className={codeFestivalStyles.secondaryButton}
          type="button"
          onClick={() => exportCsv(event, filteredApplications)}
          disabled={filteredApplications.length === 0}
        >
          CSV 내보내기
        </button>
      </div>

      <div className={styles.filters}>
        <input
          className={codeFestivalStyles.input}
          type="search"
          value={query}
          placeholder="이름, 이메일, 전화번호, 학과, 학번 검색"
          aria-label="신청자 검색"
          onChange={changeEvent => setQuery(changeEvent.target.value)}
        />
        <Filter value={campus} onChange={setCampus} label="참가 캠퍼스">
          {event.participationCampusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Filter>
        <Filter value={track} onChange={setTrack} label="참가 트랙">
          {event.trackOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Filter>
        <Filter value={status} onChange={setStatus} label="신청 상태">
          {CODE_FESTIVAL_APPLICATION_STATUSES.map(applicationStatus => (
            <option key={applicationStatus} value={applicationStatus}>
              {CODE_FESTIVAL_APPLICATION_STATUS_LABELS[applicationStatus]}
            </option>
          ))}
        </Filter>
      </div>

      <div className={styles.bulkActions}>
        <span className={styles.selectionCount}>{selectedIds.size}명 선택</span>
        <select
          className={styles.compactSelect}
          value={bulkStatus}
          aria-label="일괄 변경 상태"
          disabled={selectedIds.size === 0 || availableBulkStatuses.length === 0 || submitting}
          onChange={changeEvent =>
            setBulkStatus(changeEvent.target.value as CodeFestivalApplicationStatus)
          }
        >
          <option value="">변경할 상태</option>
          {availableBulkStatuses.map(nextStatus => (
            <option key={nextStatus} value={nextStatus}>
              {getCodeFestivalApplicationTransitionLabel(nextStatus)}
            </option>
          ))}
        </select>
        <button
          className={clsx(codeFestivalStyles.secondaryButton, styles.compactButton)}
          type="button"
          disabled={!bulkStatusAvailable || submitting}
          onClick={() => void applyBulkStatus()}
        >
          일괄 변경
        </button>
      </div>

      <ApplicationTable
        event={event}
        applications={filteredApplications}
        submitting={submitting}
        onStatusChange={onStatusChange}
        selectedIds={selectedIds}
        onSelectionChange={toggleSelection}
        onSelectAll={toggleAll}
      />
    </section>
  );
};

type FilterProps = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

const Filter = ({ value, label, onChange, children }: FilterProps) => (
  <select
    className={styles.filterSelect}
    value={value}
    aria-label={label}
    onChange={changeEvent => onChange(changeEvent.target.value)}
  >
    <option value="ALL">전체</option>
    {children}
  </select>
);

const exportCsv = (event: CodeFestivalEvent, applications: CodeFestivalApplication[]) => {
  const rows = [
    [
      '접수번호',
      '상태',
      '이름',
      '이메일',
      '전화번호',
      '소속캠퍼스',
      '학과',
      '학번',
      '재학상태',
      '참가캠퍼스',
      '트랙',
      '접수시각',
    ],
    ...applications.map(application => [
      application.id,
      CODE_FESTIVAL_APPLICATION_STATUS_LABELS[application.status],
      application.name,
      application.email,
      application.phoneNumber,
      getCodeFestivalOptionLabel(event.affiliatedCampusOptions, application.affiliatedCampus),
      application.department,
      application.studentNumber,
      getCodeFestivalOptionLabel(event.enrollmentStatusOptions, application.enrollmentStatus),
      getCodeFestivalOptionLabel(event.participationCampusOptions, application.participationCampus),
      getCodeFestivalOptionLabel(event.trackOptions, application.track),
      formatCodeFestivalDate(application.submittedAt),
    ]),
  ];
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `codefestival-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
};

const csvCell = (value: string) => {
  const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replaceAll('"', '""')}"`;
};

export default ApplicationsPanel;

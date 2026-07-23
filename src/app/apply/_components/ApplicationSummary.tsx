import { clsx } from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

import { CODE_FESTIVAL_APPLICATION_STATUS_LABELS } from '@/constants/application';
import * as styles from '@/styles/application.css';
import { CodeFestivalApplication, CodeFestivalEvent } from '@/types/application';
import { formatCodeFestivalDate, getCodeFestivalOptionLabel } from '@/utils/application';

type ApplicationSummaryProps = {
  event: CodeFestivalEvent;
  application: CodeFestivalApplication;
  submitting: boolean;
  onEdit: () => void;
  onCancel: () => void;
};

const ApplicationSummary = ({
  event,
  application,
  submitting,
  onEdit,
  onCancel,
}: ApplicationSummaryProps) => (
  <section className={styles.card}>
    <span className={clsx(styles.status, styles.summaryStatus)} data-status={application.status}>
      {CODE_FESTIVAL_APPLICATION_STATUS_LABELS[application.status]}
    </span>
    <div className={styles.summarySections}>
      <SummarySection title="접수 정보">
        <Metadata label="접수 번호" value={application.id} />
        <Metadata label="접수 시각" value={formatCodeFestivalDate(application.submittedAt)} />
      </SummarySection>
      <SummarySection title="신청자 정보">
        <Metadata label="이름" value={application.name} />
        <Metadata label="휴대전화번호" value={application.phoneNumber} />
        <Metadata label="이메일" value={application.email} fullWidth />
      </SummarySection>
      <SummarySection title="학적 정보">
        <Metadata label="소속학과" value={application.department} />
        <Metadata
          label="소속 캠퍼스"
          value={getCodeFestivalOptionLabel(
            event.affiliatedCampusOptions,
            application.affiliatedCampus,
          )}
        />
        <Metadata label="학번" value={application.studentNumber} />
        <Metadata
          label="재학 상태"
          value={getCodeFestivalOptionLabel(
            event.enrollmentStatusOptions,
            application.enrollmentStatus,
          )}
        />
      </SummarySection>
      <SummarySection title="참가 정보">
        <Metadata
          label="참가 캠퍼스"
          value={getCodeFestivalOptionLabel(
            event.participationCampusOptions,
            application.participationCampus,
          )}
        />
        <Metadata
          label="참가 트랙"
          value={getCodeFestivalOptionLabel(event.trackOptions, application.track)}
        />
      </SummarySection>
    </div>
    {application.status === 'CANCELLED' && (
      <p className={clsx(styles.notice, styles.cancelledNotice)}>
        신청을 다시 접수하려면{' '}
        <Link className={styles.textButton} href="/contact">
          운영팀에 문의해 주세요
        </Link>
        .
      </p>
    )}
    {application.status === 'SUBMITTED' && event.registrationOpen && (
      <div className={clsx(styles.actions, styles.submitActions)}>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={onEdit}
          disabled={submitting}
        >
          신청서 수정
        </button>
        <button
          className={styles.dangerButton}
          type="button"
          onClick={onCancel}
          disabled={submitting}
        >
          신청 취소
        </button>
      </div>
    )}
  </section>
);

type SummarySectionProps = { title: string; children: ReactNode };

const SummarySection = ({ title, children }: SummarySectionProps) => (
  <section className={styles.summarySection}>
    <h3 className={styles.fieldSectionTitle}>{title}</h3>
    <div className={styles.metadataGrid}>{children}</div>
  </section>
);

type MetadataProps = { label: string; value: string; fullWidth?: boolean };

const Metadata = ({ label, value, fullWidth = false }: MetadataProps) => (
  <div className={fullWidth ? styles.metadataItemFull : styles.metadataItem}>
    <span className={styles.metadataLabel}>{label}</span>
    <span className={styles.metadataValue}>{value}</span>
  </div>
);

export default ApplicationSummary;

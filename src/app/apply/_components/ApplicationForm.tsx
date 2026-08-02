import { clsx } from 'clsx';
import Link from 'next/link';
import { FormEvent, ReactNode, useState } from 'react';

import * as styles from '@/styles/application.css';
import {
  CodeFestivalApplication,
  CodeFestivalEvent,
  CodeFestivalMember,
} from '@/types/application';
import { getEnrollmentStatusNotice } from '@/utils/application';

type ApplicationFormProps = {
  event: CodeFestivalEvent;
  member: CodeFestivalMember;
  application?: CodeFestivalApplication;
  submitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

const ApplicationForm = ({
  event,
  member,
  application,
  submitting,
  onSubmit,
  onCancelEdit,
}: ApplicationFormProps) => (
  <form className={styles.form} onSubmit={onSubmit} onInvalid={scrollInvalidCardIntoView}>
    <section className={styles.card}>
      <h2 className={styles.describedCardTitle}>개인정보 수집 및 이용 동의</h2>
      <p className={styles.cardDescription}>{event.privacyPolicy}</p>
      <label className={styles.consent}>
        <input className={styles.checkbox} type="checkbox" name="privacyConsent" required />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>
    </section>

    <section className={styles.card}>
      <h2 className={styles.describedCardTitle}>인적사항</h2>
      <p className={styles.cardDescription}>
        인적사항 오기재로 인해 참가자 선발 및 대회 운영과 관련된 안내가 어려울 수 있으니, 제출 전
        오탈자 및 기재 내용을 반드시 확인해 주시기 바랍니다.
      </p>
      <div className={styles.fieldSections}>
        <div className={styles.fieldSection}>
          <h3 className={styles.fieldSectionTitle}>신청자 정보</h3>
          <div className={styles.fieldGrid}>
            <Field label="이름">
              <input className={styles.input} value={member.name} disabled />
            </Field>
            <Field label="이메일">
              <input className={styles.input} value={member.email} disabled />
            </Field>
            <Field label="휴대전화번호" hint="하이픈(-)은 자동으로 입력됩니다.">
              <PhoneNumberInput value={application?.phoneNumber} />
            </Field>
          </div>
        </div>
        <div className={styles.fieldSection}>
          <h3 className={styles.fieldSectionTitle}>학적 정보</h3>
          <div className={styles.fieldGrid}>
            <Field label="소속 학과">
              <input
                className={styles.input}
                value={application?.department ?? member.department}
                disabled
              />
            </Field>
            <Field label="소속 캠퍼스">
              <Select
                name="affiliatedCampus"
                options={event.affiliatedCampusOptions}
                value={application?.affiliatedCampus}
                placeholder="소속 캠퍼스 선택"
              />
            </Field>
            <Field label="학번">
              <StudentNumberInput
                value={member.institutionalId ?? application?.studentNumber}
                autoFilled={member.institutionalId !== null}
              />
            </Field>
            <Field label="재학 상태" hint={getEnrollmentStatusNotice(event.eventDate)}>
              <Select
                name="enrollmentStatus"
                options={event.enrollmentStatusOptions}
                value={application?.enrollmentStatus}
                placeholder="재학 상태 선택"
              />
            </Field>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.card}>
      <h2 className={styles.describedCardTitle}>대회 참가 정보</h2>
      <p className={styles.cardDescription}>
        참가를 희망하는 캠퍼스와 참가 트랙을 선택해 주시기 바랍니다.
        <br />
        <i>(※ 본전공 소속 캠퍼스가 아닌 다른 캠퍼스로도 참가할 수 있습니다.)</i>
      </p>
      <div className={styles.fieldGrid}>
        <Field label="대회 참가 캠퍼스">
          <Select
            name="participationCampus"
            options={event.participationCampusOptions}
            value={application?.participationCampus}
            placeholder="참가 캠퍼스 선택"
          />
        </Field>
        <Field label="대회 참가 트랙">
          <Select
            name="track"
            options={event.trackOptions}
            value={application?.track}
            placeholder="참가 트랙 선택"
          />
        </Field>
      </div>
    </section>

    <section className={styles.card}>
      <h2 className={styles.cardTitle}>확인 사항</h2>
      <div className={styles.consentList}>
        <Confirmation
          name="rulesConfirmed"
          text={
            <Link
              className={styles.textButton}
              href={`/festival/${event.edition}`}
              target="_blank"
              rel="noreferrer"
            >
              본인은 본 대회의 대회 일정, 사용 가능한 프로그래밍 언어 및 기타 관련 규정을
              확인했습니다.
            </Link>
          }
        />
        <Confirmation
          name="prizeConfirmed"
          text="본인은 본 대회의 상금은 재학생에 한하여 수령할 수 있으며, 휴학생 및 졸업예정자의 경우 상장과 기념품만 지급받을 수 있음을 확인했습니다."
        />
        <Confirmation
          name="noShowConfirmed"
          text="본인은 참가자 확정 이후 정당한 사유 없이 행사에 불참할 경우, 향후 GDG on Campus HUFS가 주관하는 다른 행사 참여에 제한 또는 불이익이 있을 수 있음을 확인했습니다."
        />
      </div>
      <div className={clsx(styles.actions, styles.submitActions)}>
        <button
          className={styles.button}
          type="submit"
          disabled={submitting || !event.registrationOpen}
        >
          {submitting ? '저장 중…' : application ? '신청서 수정' : '참가 신청'}
        </button>
        {application && (
          <button className={styles.secondaryButton} type="button" onClick={onCancelEdit}>
            돌아가기
          </button>
        )}
      </div>
    </section>
  </form>
);

const scrollInvalidCardIntoView = (event: FormEvent<HTMLFormElement>) => {
  const invalidElement = event.target;

  if (
    !(invalidElement instanceof HTMLElement) ||
    event.currentTarget.querySelector(':invalid') !== invalidElement
  ) {
    return;
  }

  const card = invalidElement.closest('section');

  requestAnimationFrame(() => {
    card?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

type FieldProps = { label: string; hint?: string; children: ReactNode };

const Field = ({ label, hint, children }: FieldProps) => (
  <label className={styles.field}>
    {hint ? (
      <span className={styles.fieldHeading}>
        <span className={styles.label}>{label}</span>
        <span className={styles.metadataLabel}>{hint}</span>
      </span>
    ) : (
      <span className={styles.label}>{label}</span>
    )}
    {children}
  </label>
);

type SelectProps = {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  placeholder: string;
};

const Select = ({ name, options, value, placeholder }: SelectProps) => (
  <select
    className={clsx(styles.input, styles.requiredInput)}
    name={name}
    defaultValue={value ?? ''}
    required
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

type PhoneNumberInputProps = { value?: string };

const PhoneNumberInput = ({ value: initialValue }: PhoneNumberInputProps) => {
  const [value, setValue] = useState(initialValue ?? '');

  return (
    <input
      className={clsx(styles.input, styles.requiredInput)}
      name="phoneNumber"
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      pattern="010-[0-9]{4}-[0-9]{4}"
      placeholder="010-0000-0000"
      maxLength={13}
      value={value}
      onChange={event => setValue(formatPhoneNumber(event.currentTarget.value))}
      required
    />
  );
};

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

type StudentNumberInputProps = {
  value?: string;
  autoFilled: boolean;
};

const StudentNumberInput = ({ value: initialValue, autoFilled }: StudentNumberInputProps) => {
  const [value, setValue] = useState(initialValue ?? '');

  return (
    <>
      <input
        className={clsx(styles.input, !autoFilled && styles.requiredInput)}
        name="studentNumber"
        inputMode="numeric"
        pattern="20[0-9]{7}"
        placeholder="20XXXXXXX"
        maxLength={9}
        value={value}
        onChange={event => setValue(event.currentTarget.value.replace(/\D/g, '').slice(0, 9))}
        disabled={autoFilled}
        required
      />
      {autoFilled && <input type="hidden" name="studentNumber" value={value} />}
    </>
  );
};

type ConfirmationProps = { name: string; text: ReactNode };

const Confirmation = ({ name, text }: ConfirmationProps) => (
  <label className={styles.consent}>
    <input className={styles.checkbox} type="checkbox" name={name} required />
    <span>{text}</span>
  </label>
);

export default ApplicationForm;

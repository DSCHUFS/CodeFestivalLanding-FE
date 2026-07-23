import { FormEvent, ReactNode, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/system/Dialog';
import * as codeFestivalStyles from '@/styles/application.css';
import { CodeFestivalEvent, CodeFestivalEventRequest } from '@/types/application';

import * as adminStyles from '../page.css';

type EventSettingsFormProps = {
  event?: CodeFestivalEvent;
  submitting: boolean;
  onSave: (request: CodeFestivalEventRequest) => void;
  onDelete: () => Promise<boolean>;
};

const EventSettingsForm = ({ event, submitting, onSave, onDelete }: EventSettingsFormProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const expectedDeleteConfirmation = event ? `제${event.edition}회 삭제` : '';

  const submit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    const data = new FormData(submitEvent.currentTarget);
    onSave({
      edition: String(data.get('edition')),
      title: String(data.get('title')),
      privacyPolicy: String(data.get('privacyPolicy')),
      registrationOpensAt: String(data.get('registrationOpensAt')),
      registrationClosesAt: String(data.get('registrationClosesAt')),
      eventDate: String(data.get('eventDate')),
      active: data.get('active') === 'on',
    });
  };

  const setDeleteDialogVisibility = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setDeleteConfirmation('');
    }
  };

  const deleteSelectedEvent = async () => {
    if (await onDelete()) {
      setDeleteDialogVisibility(false);
    }
  };

  return (
    <>
      <form className={adminStyles.settingsForm} onSubmit={submit}>
        <div className={codeFestivalStyles.fieldGrid}>
          <Field label="회차">
            <input
              className={codeFestivalStyles.input}
              name="edition"
              pattern="[1-9][0-9]*(?:-[a-z0-9]+)*"
              maxLength={32}
              placeholder="7 또는 7-mini"
              defaultValue={event?.edition}
              readOnly={Boolean(event)}
              required
            />
          </Field>
          <Field label="제목">
            <input
              className={codeFestivalStyles.input}
              name="title"
              maxLength={255}
              defaultValue={event?.title}
              required
            />
          </Field>
        </div>

        <TextArea
          label="개인정보 수집 및 이용 동의"
          name="privacyPolicy"
          value={event?.privacyPolicy}
        />
        <div className={adminStyles.dateGrid}>
          <DateField
            label="신청 시작"
            name="registrationOpensAt"
            value={event?.registrationOpensAt}
          />
          <DateField
            label="신청 종료"
            name="registrationClosesAt"
            value={event?.registrationClosesAt}
          />
          <Field label="대회 개최일">
            <input
              className={codeFestivalStyles.input}
              name="eventDate"
              type="date"
              defaultValue={event?.eventDate}
              required
            />
          </Field>
        </div>

        <label className={codeFestivalStyles.consent}>
          <input
            className={codeFestivalStyles.checkbox}
            type="checkbox"
            name="active"
            defaultChecked={event?.active ?? true}
          />
          <span>현재 진행 중인 대회로 설정</span>
        </label>

        <button className={codeFestivalStyles.button} type="submit" disabled={submitting}>
          {submitting ? '저장 중…' : event ? '행사 설정 저장' : '새 행사 생성'}
        </button>

        {event && (
          <div className={adminStyles.dangerZone}>
            <div>
              <h3 className={adminStyles.dangerZoneTitle}>대회 삭제</h3>
              <p className={codeFestivalStyles.description}>
                대회와 해당 회차의 참가 신청 정보를 모두 영구 삭제합니다.
              </p>
            </div>
            <button
              className={codeFestivalStyles.dangerButton}
              type="button"
              disabled={submitting}
              onClick={() => setDeleteDialogVisibility(true)}
            >
              대회 삭제
            </button>
          </div>
        )}
      </form>

      {event && (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogVisibility}>
          <DialogOverlay />
          <DialogContent className={adminStyles.deleteDialog}>
            <DialogHeader className={adminStyles.deleteDialogHeader}>
              <DialogTitle>제{event.edition}회 대회 삭제</DialogTitle>
              <DialogDescription className={adminStyles.deleteDialogDescription}>
                <span>
                  이 대회와 모든 참가 신청 정보가 영구 삭제되며 복구할 수 없습니다. 계속하려면
                  아래에{' '}
                </span>
                <strong>{expectedDeleteConfirmation}</strong>
                <span>를 입력하세요.</span>
              </DialogDescription>
            </DialogHeader>
            <input
              className={codeFestivalStyles.input}
              value={deleteConfirmation}
              aria-label="대회 삭제 확인 문구"
              autoComplete="off"
              onChange={changeEvent => setDeleteConfirmation(changeEvent.target.value)}
            />
            <DialogFooter>
              <DialogClose asChild>
                <button
                  className={codeFestivalStyles.secondaryButton}
                  type="button"
                  disabled={submitting}
                >
                  취소
                </button>
              </DialogClose>
              <button
                className={codeFestivalStyles.dangerButton}
                type="button"
                disabled={deleteConfirmation !== expectedDeleteConfirmation || submitting}
                onClick={() => void deleteSelectedEvent()}
              >
                {submitting ? '삭제 중…' : '영구 삭제'}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

type FieldProps = { label: string; children: ReactNode };

const Field = ({ label, children }: FieldProps) => (
  <label className={codeFestivalStyles.field}>
    <span className={codeFestivalStyles.label}>{label}</span>
    {children}
  </label>
);

type TextAreaProps = { label: string; name: string; value?: string };

const TextArea = ({ label, name, value }: TextAreaProps) => (
  <Field label={label}>
    <textarea className={adminStyles.textarea} name={name} defaultValue={value} required />
  </Field>
);

type DateFieldProps = { label: string; name: string; value?: string };

const DateField = ({ label, name, value }: DateFieldProps) => (
  <Field label={label}>
    <input
      className={codeFestivalStyles.input}
      name={name}
      type="datetime-local"
      step={1}
      defaultValue={value?.slice(0, 19)}
      required
    />
  </Field>
);

export default EventSettingsForm;

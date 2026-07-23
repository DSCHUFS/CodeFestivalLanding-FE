import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import {
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

import * as adminStyles from '../page.css';

type ApplicationTableProps = {
  event: CodeFestivalEvent;
  applications: CodeFestivalApplication[];
  submitting: boolean;
  onStatusChange: (id: string, status: CodeFestivalApplicationStatus) => void;
  selectedIds: Set<string>;
  onSelectionChange: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
};

const ApplicationTable = ({
  event,
  applications,
  submitting,
  onStatusChange,
  selectedIds,
  onSelectionChange,
  onSelectAll,
}: ApplicationTableProps) => {
  const selectedVisibleCount = applications.filter(application =>
    selectedIds.has(application.id),
  ).length;
  const allSelected = applications.length > 0 && selectedVisibleCount === applications.length;

  return (
    <div className={adminStyles.tableWrapper}>
      <table className={adminStyles.table}>
        <thead>
          <tr>
            <th>
              <SelectionCheckbox
                label="현재 목록 전체 선택"
                checked={allSelected}
                indeterminate={selectedVisibleCount > 0 && !allSelected}
                disabled={applications.length === 0 || submitting}
                onChange={onSelectAll}
              />
            </th>
            <th>상태</th>
            <th>이름</th>
            <th>연락처</th>
            <th>소속</th>
            <th>참가 정보</th>
            <th>접수 시각</th>
            <th>상태 변경</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>
                <SelectionCheckbox
                  label={`${application.name} 신청 선택`}
                  checked={selectedIds.has(application.id)}
                  disabled={submitting}
                  onChange={selected => onSelectionChange(application.id, selected)}
                />
              </td>
              <td>
                <span className={codeFestivalStyles.status} data-status={application.status}>
                  {CODE_FESTIVAL_APPLICATION_STATUS_LABELS[application.status]}
                </span>
              </td>
              <td>
                <strong>{application.name}</strong>
                <span className={adminStyles.secondaryText}>{application.studentNumber}</span>
              </td>
              <td>
                <span>{application.email}</span>
                <span className={adminStyles.secondaryText}>{application.phoneNumber}</span>
              </td>
              <td>
                <span>
                  {getCodeFestivalOptionLabel(
                    event.affiliatedCampusOptions,
                    application.affiliatedCampus,
                  )}
                </span>
                <span className={adminStyles.secondaryText}>{application.department}</span>
                <span className={adminStyles.secondaryText}>
                  {getCodeFestivalOptionLabel(
                    event.enrollmentStatusOptions,
                    application.enrollmentStatus,
                  )}
                </span>
              </td>
              <td>
                <span>
                  {getCodeFestivalOptionLabel(
                    event.participationCampusOptions,
                    application.participationCampus,
                  )}
                </span>
                <span className={adminStyles.secondaryText}>
                  {getCodeFestivalOptionLabel(event.trackOptions, application.track)}
                </span>
              </td>
              <td>{formatCodeFestivalDate(application.submittedAt)}</td>
              <td>
                {application.availableStatuses.includes('SUBMITTED') ? (
                  <button
                    className={clsx(codeFestivalStyles.secondaryButton, adminStyles.compactButton)}
                    type="button"
                    disabled={submitting}
                    onClick={() => onStatusChange(application.id, 'SUBMITTED')}
                  >
                    신청 복구
                  </button>
                ) : (
                  <select
                    className={adminStyles.compactSelect}
                    value=""
                    aria-label={`${application.name} 상태 변경`}
                    disabled={submitting}
                    onChange={changeEvent => {
                      onStatusChange(
                        application.id,
                        changeEvent.target.value as CodeFestivalApplicationStatus,
                      );
                    }}
                  >
                    <option value="" disabled>
                      선택
                    </option>
                    {application.availableStatuses.map(status => (
                      <option key={status} value={status}>
                        {getCodeFestivalApplicationTransitionLabel(status)}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type SelectionCheckboxProps = {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
};

const SelectionCheckbox = ({
  label,
  checked,
  indeterminate = false,
  disabled,
  onChange,
}: SelectionCheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      className={clsx(codeFestivalStyles.checkbox, adminStyles.tableCheckbox)}
      type="checkbox"
      aria-label={label}
      checked={checked}
      disabled={disabled}
      onChange={changeEvent => onChange(changeEvent.target.checked)}
    />
  );
};

export default ApplicationTable;

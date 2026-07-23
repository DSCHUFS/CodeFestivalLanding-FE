import { CodeFestivalApplicationStatus } from '@/types/application';

export const CODE_FESTIVAL_APPLICATION_STATUS_LABELS: Record<
  CodeFestivalApplicationStatus,
  string
> = {
  SUBMITTED: '접수 완료',
  SELECTED: '선발',
  REJECTED: '미선발',
  CANCELLED: '신청 취소',
};

export const CODE_FESTIVAL_APPLICATION_STATUSES = Object.keys(
  CODE_FESTIVAL_APPLICATION_STATUS_LABELS,
) as CodeFestivalApplicationStatus[];

export const getCodeFestivalApplicationTransitionLabel = (status: CodeFestivalApplicationStatus) =>
  status === 'SUBMITTED' ? '접수 복구' : CODE_FESTIVAL_APPLICATION_STATUS_LABELS[status];

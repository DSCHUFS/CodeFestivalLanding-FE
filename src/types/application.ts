export type ApiResponse<T> = {
  data?: T;
  error_code?: string;
  message?: string;
};

export type CodeFestivalOption = {
  value: string;
  label: string;
};

export type CodeFestivalEvent = {
  edition: string;
  title: string;
  privacyPolicy: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  eventDate: string;
  active: boolean;
  registrationOpen: boolean;
  affiliatedCampusOptions: CodeFestivalOption[];
  participationCampusOptions: CodeFestivalOption[];
  enrollmentStatusOptions: CodeFestivalOption[];
  trackOptions: CodeFestivalOption[];
};

export type CodeFestivalCurrentEvent = Pick<
  CodeFestivalEvent,
  'edition' | 'title' | 'registrationOpensAt' | 'registrationClosesAt' | 'eventDate'
>;

export type CodeFestivalEventRequest = {
  edition: string;
  title: string;
  privacyPolicy: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  eventDate: string;
  active: boolean;
};

export type CodeFestivalEventList = {
  events: Omit<
    CodeFestivalEvent,
    | 'affiliatedCampusOptions'
    | 'participationCampusOptions'
    | 'enrollmentStatusOptions'
    | 'trackOptions'
  >[];
  affiliatedCampusOptions: CodeFestivalOption[];
  participationCampusOptions: CodeFestivalOption[];
  enrollmentStatusOptions: CodeFestivalOption[];
  trackOptions: CodeFestivalOption[];
};

export type CodeFestivalMember = {
  name: string;
  email: string;
  department: string;
  admin: boolean;
};

export type CodeFestivalApplicationStatus = 'SUBMITTED' | 'SELECTED' | 'REJECTED' | 'CANCELLED';

export type CodeFestivalApplication = {
  id: string;
  edition: string;
  name: string;
  email: string;
  phoneNumber: string;
  affiliatedCampus: string;
  department: string;
  studentNumber: string;
  enrollmentStatus: string;
  participationCampus: string;
  track: string;
  status: CodeFestivalApplicationStatus;
  availableStatuses: CodeFestivalApplicationStatus[];
  submittedAt: string;
};

export type CodeFestivalApplicationRequest = {
  phoneNumber: string;
  affiliatedCampus: string;
  studentNumber: string;
  enrollmentStatus: string;
  participationCampus: string;
  track: string;
  privacyConsent: boolean;
  rulesConfirmed: boolean;
  prizeConfirmed: boolean;
  noShowConfirmed: boolean;
};

export type CodeFestivalToken = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
};

import {
  ApiResponse,
  CodeFestivalApplication,
  CodeFestivalApplicationRequest,
  CodeFestivalApplicationStatus,
  CodeFestivalEvent,
  CodeFestivalEventList,
  CodeFestivalEventRequest,
  CodeFestivalMember,
  CodeFestivalToken,
} from '@/types/application';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.gdghufs.com';
const ACCESS_TOKEN_KEY = 'codefestival_access_token';
const LOGIN_STATE_KEY = 'codefestival_login_state';
const LOGIN_RETURN_TO_KEY = 'codefestival_login_return_to';

export class CodeFestivalApiError extends Error {
  constructor(
    public readonly code: string | undefined,
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

const request = async <T>(path: string, init?: RequestInit, authenticated = false): Promise<T> => {
  const headers = new Headers(init?.headers);
  headers.set('Accept', 'application/json');

  if (init?.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (authenticated) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new CodeFestivalApiError('AUTH_REQUIRED', '재학생 인증이 필요합니다.', 401);
    }
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;

  if (authenticated && response.status === 401) {
    clearAccessToken();
    throw new CodeFestivalApiError('AUTH_REQUIRED', '다시 로그인해 주세요.', response.status);
  }

  if (!response.ok || payload.data === undefined) {
    throw new CodeFestivalApiError(
      payload.error_code,
      payload.message ?? '요청을 처리하지 못했습니다.',
      response.status,
    );
  }

  return payload.data;
};

export const beginCodeFestivalLogin = (returnTo = '/apply') => {
  const state = crypto.randomUUID();
  sessionStorage.setItem(LOGIN_STATE_KEY, state);
  sessionStorage.setItem(LOGIN_RETURN_TO_KEY, returnTo);
  window.location.assign(
    `${API_BASE_URL}/v1/codefestival/auth/login?state=${encodeURIComponent(state)}`,
  );
};

export const consumeLoginReturnTo = () => {
  const returnTo = sessionStorage.getItem(LOGIN_RETURN_TO_KEY);
  sessionStorage.removeItem(LOGIN_RETURN_TO_KEY);
  if (!returnTo || returnTo.startsWith('//')) {
    return '/apply';
  }

  return returnTo === '/admin' || returnTo === '/apply' || returnTo.startsWith('/apply/')
    ? returnTo
    : '/apply';
};

export const validateLoginState = (state: string) => {
  const expectedState = sessionStorage.getItem(LOGIN_STATE_KEY);
  sessionStorage.removeItem(LOGIN_STATE_KEY);
  return expectedState !== null && expectedState === state;
};

export const exchangeLoginCode = async (code: string) => {
  const token = await request<CodeFestivalToken>('/v1/codefestival/auth/token', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
};

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY);

export const clearAccessToken = () => sessionStorage.removeItem(ACCESS_TOKEN_KEY);

export const endCodeFestivalSession = async () => {
  const accessToken = getAccessToken();
  try {
    if (accessToken) {
      await fetch(`${API_BASE_URL}/v1/codefestival/auth/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } catch {
    // 로컬 토큰은 서버 응답과 관계없이 폐기해 계정 전환을 보장합니다.
  } finally {
    clearAccessToken();
  }
};

export const getCurrentEvent = () => request<CodeFestivalEvent>('/v1/codefestival/events/current');

export const getCurrentMember = () =>
  request<CodeFestivalMember>('/v1/codefestival/me', undefined, true);

export const getMyApplication = () =>
  request<CodeFestivalApplication>('/v1/codefestival/applications/me', undefined, true);

export const createApplication = (application: CodeFestivalApplicationRequest) =>
  request<CodeFestivalApplication>(
    '/v1/codefestival/applications',
    { method: 'POST', body: JSON.stringify(application) },
    true,
  );

export const updateApplication = (id: string, application: CodeFestivalApplicationRequest) =>
  request<CodeFestivalApplication>(
    `/v1/codefestival/applications?id=${encodeURIComponent(id)}`,
    { method: 'PATCH', body: JSON.stringify(application) },
    true,
  );

export const cancelApplication = (id: string) =>
  request<CodeFestivalApplication>(
    `/v1/codefestival/applications?id=${encodeURIComponent(id)}`,
    { method: 'DELETE' },
    true,
  );

export const getAdminEvents = async () => {
  const response = await request<CodeFestivalEventList>(
    '/v1/codefestival/events/compact',
    undefined,
    true,
  );
  const options = {
    affiliatedCampusOptions: response.affiliatedCampusOptions,
    participationCampusOptions: response.participationCampusOptions,
    enrollmentStatusOptions: response.enrollmentStatusOptions,
    trackOptions: response.trackOptions,
  };
  return response.events.map(event => ({ ...event, ...options }));
};

export const getAdminApplications = (edition: string) =>
  request<CodeFestivalApplication[]>(
    `/v1/codefestival/admin/applications?edition=${encodeURIComponent(edition)}`,
    undefined,
    true,
  );

export const updateApplicationStatuses = (
  edition: string,
  ids: string[],
  status: CodeFestivalApplicationStatus,
) =>
  request<CodeFestivalApplication[]>(
    '/v1/codefestival/admin/applications/status',
    { method: 'PATCH', body: JSON.stringify({ edition, ids, status }) },
    true,
  );

export const createEvent = (event: CodeFestivalEventRequest) =>
  request<CodeFestivalEvent>(
    '/v1/codefestival/events',
    { method: 'POST', body: JSON.stringify(event) },
    true,
  );

export const updateEvent = (edition: string, event: CodeFestivalEventRequest) =>
  request<CodeFestivalEvent>(
    `/v1/codefestival/events/${encodeURIComponent(edition)}`,
    { method: 'PUT', body: JSON.stringify(event) },
    true,
  );

export const deleteEvent = (edition: string) =>
  request<CodeFestivalEvent>(
    `/v1/codefestival/events/${encodeURIComponent(edition)}`,
    { method: 'DELETE' },
    true,
  );

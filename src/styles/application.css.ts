import { style } from '@vanilla-extract/css';

import { skeleton } from '@/styles/skeleton.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const root = style({
  width: '100%',
  maxWidth: rem(880),
  paddingInline: theme.sizes.appInlinePadding,
  paddingBottom: rem(80),
  marginTop: theme.spaces.lg,
  marginInline: 'auto',
  fontFamily: 'var(--font-pretendard)',
});

export const description = style({
  color: theme.colors.white80,
  lineHeight: 1.65,
  whiteSpace: 'pre-wrap',
});

export const cardDescription = style([
  description,
  {
    marginBottom: theme.spaces.lg,
  },
]);

export const card = style({
  padding: `clamp(${rem(20)}, 4vw, ${rem(32)})`,
  marginTop: rem(20),
  scrollMarginTop: `calc(${theme.sizes.appHeaderHeight} + ${theme.spaces.default})`,
  backgroundColor: theme.colors.white05,
  border: `${rem(1)} solid ${theme.colors.white10}`,
  borderRadius: rem(20),
});

export const cardTitle = style({
  marginBottom: rem(20),
  fontSize: rem(20),
  fontWeight: 700,
});

export const applicationTitleSkeleton = style([
  skeleton,
  {
    width: `min(${rem(420)}, 75vw)`,
    height: rem(42),
  },
]);

export const applicationCardTitleSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: `min(${rem(260)}, 60vw)`,
    height: rem(24),
  },
]);

export const applicationTextSkeletons = style({
  display: 'grid',
  gap: rem(8),
  marginTop: rem(16),
  marginBottom: rem(24),
});

export const applicationTextSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: '100%',
    height: rem(14),
  },
]);

export const applicationShortTextSkeleton = style([
  applicationTextSkeleton,
  {
    width: '68%',
  },
]);

export const applicationSectionTitleSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: rem(110),
    height: rem(20),
  },
]);

export const applicationFieldSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: '100%',
    height: rem(70),
    borderRadius: rem(10),
  },
]);

export const applicationConsentSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: '100%',
    height: rem(24),
  },
]);

export const applicationConfirmationSkeletons = style({
  display: 'grid',
  gap: rem(14),
  marginTop: rem(20),
});

export const applicationButtonSkeleton = style([
  skeleton,
  {
    display: 'block',
    width: rem(104),
    height: rem(46),
    marginTop: theme.spaces.lg,
    borderRadius: rem(10),
  },
]);

export const describedCardTitle = style([
  cardTitle,
  {
    marginBottom: theme.spaces.xs,
  },
]);

export const authCard = style({
  width: '100%',
  maxWidth: rem(460),
  marginInline: 'auto',
  textAlign: 'center',
});

export const authActions = style({
  justifyContent: 'center',
});

export const authButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: rem(10),
});

export const metadataGrid = style({
  display: 'grid',
  gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
  gap: rem(16),

  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const metadataItem = style({
  display: 'grid',
  gap: rem(4),
});

export const metadataItemFull = style([
  metadataItem,
  {
    gridColumn: '1 / -1',
  },
]);

export const summarySections = style({
  display: 'grid',
});

export const summarySection = style({
  display: 'grid',
  gap: theme.spaces.sm,
  paddingBlock: theme.spaces.lg,
  borderBottom: `${rem(1)} solid ${theme.colors.white10}`,

  selectors: {
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
      borderBottom: 0,
    },
  },
});

export const metadataLabel = style({
  color: theme.colors.white60,
  fontSize: rem(12),
});

export const metadataValue = style({
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
});

export const form = style({
  display: 'grid',
  gap: rem(20),
});

export const fieldGrid = style({
  display: 'grid',
  gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
  alignItems: 'end',
  gap: rem(16),

  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const fieldSections = style({
  display: 'grid',
  gap: theme.spaces.xl,
});

export const fieldSection = style({
  display: 'grid',
  gap: theme.spaces.sm,
});

export const fieldSectionTitle = style({
  fontSize: rem(18),
  fontWeight: 700,
});

export const field = style({
  display: 'grid',
  alignContent: 'start',
  gap: rem(8),
});

export const label = style({
  fontSize: rem(14),
  fontWeight: 600,
});

export const fieldHeading = style({
  display: 'grid',
  gap: theme.spaces.xxs,
});

export const input = style({
  width: '100%',
  minHeight: rem(46),
  paddingInline: rem(14),
  scrollMarginTop: `calc(${theme.sizes.appHeaderHeight} + ${theme.spaces.default})`,
  color: theme.colors.white,
  font: 'inherit',
  backgroundColor: theme.colors.black,
  border: `${rem(1)} solid ${theme.colors.white20}`,
  borderRadius: rem(10),

  selectors: {
    '&:focus': {
      outline: `${rem(2)} solid ${theme.colors.white60}`,
      outlineOffset: rem(2),
    },
    '&:disabled': {
      color: theme.colors.white60,
      cursor: 'not-allowed',
    },
  },
});

export const requiredInput = style({
  borderColor: 'rgba(255, 123, 123, 0.7)',

  selectors: {
    '&:valid': {
      borderColor: theme.colors.white20,
    },
  },
});

export const consentList = style({
  display: 'grid',
  gap: rem(14),
});

export const consent = style({
  display: 'grid',
  gridTemplateColumns: `${rem(20)} 1fr`,
  alignItems: 'start',
  gap: rem(10),
  color: theme.colors.white90,
  lineHeight: 1.65,
  cursor: 'pointer',
});

export const checkbox = style({
  width: rem(18),
  height: rem(18),
  marginTop: rem(3),
  scrollMarginTop: `calc(${theme.sizes.appHeaderHeight} + ${theme.spaces.default})`,
  accentColor: theme.colors.white,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: rem(12),
  marginTop: rem(8),
});

export const submitActions = style({
  marginTop: theme.spaces.lg,
});

export const button = style({
  minHeight: rem(46),
  paddingInline: rem(20),
  color: theme.colors.black,
  font: 'inherit',
  fontWeight: 700,
  backgroundColor: theme.colors.white,
  borderRadius: rem(10),

  selectors: {
    '&:disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
  },
});

export const secondaryButton = style([
  button,
  {
    color: theme.colors.white,
    backgroundColor: theme.colors.white10,
  },
]);

export const dangerButton = style([
  secondaryButton,
  {
    color: '#ffb4b4',
  },
]);

export const notice = style({
  width: '100%',
  maxWidth: rem(840),
  padding: rem(16),
  marginTop: rem(20),
  marginInline: 'auto',
  color: theme.colors.white90,
  lineHeight: 1.65,
  backgroundColor: theme.colors.white10,
  borderRadius: rem(12),
});

export const error = style([
  notice,
  {
    color: '#ffb4b4',
  },
]);

export const cancelledNotice = style({
  marginTop: theme.spaces.xl,
});

export const status = style({
  display: 'inline-flex',
  padding: `${rem(5)} ${rem(10)}`,
  marginBottom: rem(12),
  fontSize: rem(12),
  fontWeight: 700,
  backgroundColor: theme.colors.white10,
  borderRadius: rem(999),

  selectors: {
    '&[data-status="SUBMITTED"]': {
      color: '#b8d9ff',
      backgroundColor: 'rgba(73, 139, 255, 0.18)',
    },
    '&[data-status="SELECTED"]': {
      color: '#b7f7ce',
      backgroundColor: 'rgba(52, 199, 89, 0.18)',
    },
    '&[data-status="REJECTED"]': {
      color: '#d0d3dc',
      backgroundColor: 'rgba(148, 153, 170, 0.18)',
    },
    '&[data-status="CANCELLED"]': {
      color: '#ffb4b4',
      backgroundColor: 'rgba(255, 92, 92, 0.18)',
    },
  },
});

export const summaryStatus = style({
  marginBottom: theme.spaces.lg,
});

export const sessionActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: rem(12),
  marginTop: rem(20),
  color: theme.colors.white60,
  fontSize: rem(12),
});

export const textButton = style({
  padding: 0,
  color: theme.colors.white80,
  font: 'inherit',
  textDecoration: 'underline',
  textUnderlineOffset: rem(3),
  background: 'none',

  selectors: {
    '&:disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
  },
});

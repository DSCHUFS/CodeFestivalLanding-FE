import { globalStyle, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const root = style({
  width: '100%',
  maxWidth: rem(1440),
  paddingInline: theme.sizes.appInlinePadding,
  paddingBottom: rem(80),
  marginTop: theme.spaces.lg,
  marginInline: 'auto',
  fontFamily: 'var(--font-pretendard)',
});

export const accountBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: rem(12),
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
});

export const eventManager = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: rem(16),
  padding: rem(20),
  backgroundColor: theme.colors.white05,
  border: `${rem(1)} solid ${theme.colors.white10}`,
  borderRadius: rem(16),
});

export const eventSelector = style({
  display: 'grid',
  flex: '1 1 auto',
  maxWidth: rem(520),
  gap: theme.spaces.xs,
});

export const eventSelectorLabel = style({
  color: theme.colors.white60,
  fontSize: rem(12),
  fontWeight: 600,
});

export const tabs = style({
  display: 'flex',
  gap: rem(8),
  marginTop: rem(24),
  borderBottom: `${rem(1)} solid ${theme.colors.white10}`,
});

export const tab = style({
  padding: `${rem(12)} ${rem(16)}`,
  color: theme.colors.white60,
  font: 'inherit',
  background: 'none',
  borderBottom: `${rem(2)} solid transparent`,

  selectors: {
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
});

export const activeTab = style([
  tab,
  {
    color: theme.colors.white,
    borderBottomColor: theme.colors.white,
  },
]);

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: rem(16),
});

export const filters = style({
  display: 'grid',
  gridTemplateColumns: `minmax(${rem(260)}, 1fr) repeat(3, minmax(${rem(150)}, auto))`,
  gap: rem(10),
  marginBlock: rem(20),

  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    'screen and (max-width: 560px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const filterSelect = style({
  minHeight: rem(46),
  paddingInline: rem(12),
  color: theme.colors.white,
  font: 'inherit',
  backgroundColor: theme.colors.black,
  border: `${rem(1)} solid ${theme.colors.white20}`,
  borderRadius: rem(10),
});

export const tableWrapper = style({
  overflowX: 'auto',
});

export const bulkActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: rem(10),
  marginBottom: rem(12),
});

export const selectionCount = style({
  marginRight: 'auto',
  color: theme.colors.white60,
  fontSize: rem(13),
});

export const table = style({
  width: '100%',
  minWidth: rem(1120),
  borderCollapse: 'collapse',
  fontSize: rem(13),
});

globalStyle(`${table} th`, {
  padding: rem(12),
  color: theme.colors.white60,
  fontWeight: 600,
  textAlign: 'left',
  borderBottom: `${rem(1)} solid ${theme.colors.white20}`,
});

globalStyle(`${table} td`, {
  padding: rem(12),
  lineHeight: 1.55,
  verticalAlign: 'top',
  borderBottom: `${rem(1)} solid ${theme.colors.white10}`,
});

export const secondaryText = style({
  display: 'block',
  color: theme.colors.white60,
  fontSize: rem(12),
});

export const compactSelect = style({
  minHeight: rem(36),
  paddingInline: rem(8),
  color: theme.colors.white,
  font: 'inherit',
  backgroundColor: theme.colors.black,
  border: `${rem(1)} solid ${theme.colors.white20}`,
  borderRadius: rem(8),
});

export const compactButton = style({
  minHeight: rem(36),
  paddingInline: rem(10),
  borderRadius: rem(8),
});

export const tableCheckbox = style({
  display: 'block',
  margin: 0,
});

export const settingsForm = style({
  display: 'grid',
  gap: rem(18),
  marginTop: rem(24),
});

export const textarea = style({
  width: '100%',
  minHeight: rem(120),
  padding: rem(14),
  color: theme.colors.white,
  font: 'inherit',
  lineHeight: 1.65,
  resize: 'vertical',
  backgroundColor: theme.colors.black,
  border: `${rem(1)} solid ${theme.colors.white20}`,
  borderRadius: rem(10),
});

export const dateGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: rem(16),

  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const dangerZone = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: rem(16),
  paddingTop: rem(24),
  marginTop: rem(12),
  borderTop: `${rem(1)} solid rgba(255, 180, 180, 0.3)`,
});

export const dangerZoneTitle = style({
  marginBottom: rem(6),
  color: '#ffb4b4',
  fontSize: rem(16),
});

export const deleteDialog = style({
  width: `min(${rem(520)}, calc(100vw - ${rem(32)}))`,
  padding: rem(24),
  color: theme.colors.white,
  backgroundColor: '#111217',
  border: `${rem(1)} solid ${theme.colors.white20}`,
  borderRadius: rem(16),
  boxShadow: `0 ${rem(20)} ${rem(60)} rgba(0, 0, 0, 0.55)`,
});

export const deleteDialogHeader = style({
  gap: rem(10),
  marginBottom: rem(20),
});

export const deleteDialogDescription = style({
  color: theme.colors.white70,
  fontSize: rem(14),
  lineHeight: 1.65,
});

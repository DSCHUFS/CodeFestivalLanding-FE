import { style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const toast = style({
  position: 'fixed',
  right: theme.sizes.appInlinePadding,
  bottom: theme.sizes.appInlinePadding,
  display: 'flex',
  alignItems: 'flex-start',
  width: `min(${rem(420)}, calc(100vw - ${rem(32)}))`,
  padding: rem(16),
  gap: rem(12),
  color: theme.colors.white,
  lineHeight: 1.55,
  backgroundColor: '#202124',
  border: `${rem(1)} solid ${theme.colors.white20}`,
  borderRadius: rem(12),
  boxShadow: `0 ${rem(12)} ${rem(40)} rgba(0, 0, 0, 0.45)`,
  zIndex: theme.zIndices.toast,
});

export const toastError = style({
  color: '#ffb4b4',
  borderColor: 'rgba(255, 180, 180, 0.45)',
});

export const toastMessage = style({
  flex: 1,
});

export const toastClose = style({
  flexShrink: 0,
  padding: 0,
  color: theme.colors.white60,
  font: 'inherit',
  fontSize: rem(18),
  lineHeight: 1,
  background: 'none',

  selectors: {
    '&:hover': {
      color: theme.colors.white,
    },
    '&:focus-visible': {
      outline: `${rem(1)} solid currentColor`,
      outlineOffset: rem(2),
    },
  },
});

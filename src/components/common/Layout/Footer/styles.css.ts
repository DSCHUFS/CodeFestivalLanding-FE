import { globalStyle, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const root = style({
  ...theme.layouts.column,
  paddingBlock: rem(36),
  paddingInline: theme.sizes.appInlinePadding,
});

export const brandingContainer = style({
  ...theme.layouts.rowBetween,
});

export const branding = style({
  ...theme.layouts.centerY,
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(16),
  fontWeight: 500,
  gap: theme.spaces.sm,
});

export const logo = style({
  userSelect: 'none',
});

export const license = style({
  marginTop: rem(16),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(12),
  lineHeight: '180%',
  letterSpacing: rem(0.2),
});

export const location = style({
  position: 'relative',
  display: 'inline-block',
});

export const locationTrigger = style({
  color: 'inherit',
  font: 'inherit',
  letterSpacing: 'inherit',
  lineHeight: 'inherit',
  textDecoration: 'underline',
  textDecorationThickness: 'from-font',
  textUnderlineOffset: rem(2),

  selectors: {
    '&:focus-visible': {
      outline: `${rem(1)} solid currentColor`,
      outlineOffset: rem(2),
    },
  },
});

export const locationTooltip = style({
  position: 'absolute',
  left: '50%',
  bottom: `calc(100% + ${rem(8)})`,
  width: 'max-content',
  maxWidth: `calc(100vw - ${rem(32)})`,
  paddingBlock: rem(6),
  paddingInline: rem(10),
  color: theme.colors.black,
  fontFamily: 'var(--font-pretendard)',
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '140%',
  textAlign: 'center',
  backgroundColor: theme.colors.white,
  borderRadius: rem(4),
  opacity: 0,
  visibility: 'hidden',
  pointerEvents: 'none',
  transform: 'translate(-50%, 4px)',
  transition: 'opacity 150ms ease-out, transform 150ms ease-out, visibility 150ms',
  zIndex: theme.zIndices.overlay,

  selectors: {
    [`${location}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translate(-50%, 0)',
    },
    [`${location}:focus-within &`]: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translate(-50%, 0)',
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

globalStyle(`${license} > a`, {
  color: theme.colors.white,
  textDecoration: 'none',
  opacity: 1,
  transition: 'opacity 0.2s',
});

globalStyle(`${license} > a:hover`, { opacity: 0.8 });

import { style } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { skeleton } from '@/styles/skeleton.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const title = style({
  marginTop: rem(60),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(28),
  fontWeight: 600,
  lineHeight: '100%',
  textAlign: 'center',

  ...breakpoint({ tablet: { fontSize: rem(32) } }),
});

export const description = style({
  paddingInline: theme.sizes.appInlinePadding,
  marginTop: rem(28),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontWeight: 400,
  fontSize: rem(14.5),
  lineHeight: '200%',
  textAlign: 'center',
  wordBreak: 'break-word',
});

export const directLink = style({
  ...theme.layouts.centerY,
  width: 'fit-content',
  marginTop: rem(20),
  marginInline: 'auto',
  marginBottom: rem(60),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(16),
  fontWeight: 500,
  borderBottom: `${rem(1)} solid ${theme.colors.white}`,
  opacity: 1,
  gap: rem(4),
  transition: 'opacity 0.2s',

  ':hover': { opacity: 0.8 },
});

export const directLinkPlaceholder = style({
  display: 'block',
  width: rem(220),
  height: rem(25),
  marginTop: rem(20),
  marginInline: 'auto',
  marginBottom: rem(60),
});

export const directLinkSkeleton = style([directLinkPlaceholder, skeleton]);

import { style } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { skeleton } from '@/styles/skeleton.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

export const root = style({
  position: 'fixed',
  left: 0,
  width: 'calc(100% - var(--removed-body-scroll-bar-size, 0px))',
  height: theme.sizes.appHeaderHeight,
  backdropFilter: `blur(${rem(8)})`,
  zIndex: theme.zIndices.header,
});

export const inner = style({
  ...theme.layouts.rowBetween,
  width: '100%',
  height: '100%',
  maxWidth: theme.sizes.appWidth,
  paddingInline: theme.sizes.appInlinePadding,
  marginInline: 'auto',
});

export const ci = style({
  position: 'relative',
  width: rem(156 * 0.85),
  height: rem(52 * 0.85),
  userSelect: 'none',

  ...breakpoint({ tablet: { width: rem(156), height: rem(52) } }),
});

export const navigation = style({
  display: 'none',
  userSelect: 'none',
  gap: theme.spaces.xl,

  ...breakpoint({ mobile: { ...theme.layouts.centerY } }),
});

export const menu = style({
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains), var(--font-pretendard)',
  fontSize: rem(16),
  fontWeight: 500,
  letterSpacing: rem(-0.1),
  lineHeight: '100%',
});

export const menuSkeleton = style([
  skeleton,
  {
    width: rem(164),
    height: rem(16),
    flexShrink: 0,
  },
]);

export const menuTrigger = style({
  ...theme.layouts.center,
  userSelect: 'none',

  ...breakpoint({ mobile: { display: 'none' } }),
});

export const mobileMenu = style({
  width: '100%',
  height: '100%',
  padding: 0,
});

export const mobileMenuHeaderDisabled = style({
  display: 'none',
});

export const mobileMenuOverlay = style({
  ...theme.layouts.center,
  width: '100%',
  height: '100%',
  cursor: 'default',
});

export const mobileMenuNavigation = style({
  ...theme.layouts.column,
  alignItems: 'flex-end',
  width: 'fit-content',
  padding: theme.sizes.appInlinePadding,
  marginLeft: 'auto',
  textAlign: 'end',
  gap: rem(28),
});

export const mobileMenuItem = style({
  width: 'fit-content',
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(32),
  fontWeight: 600,
  letterSpacing: rem(-0.1),
  lineHeight: '100%',
  textDecoration: 'none',
  transition: 'color 0.2s',

  ':hover': { color: theme.colors.white80 },
});

export const mobileMenuItemSkeleton = style([
  skeleton,
  {
    width: rem(220),
    height: rem(32),
    flexShrink: 0,
  },
]);

export const mobileMenuClose = style({
  ...theme.layouts.center,
  position: 'absolute',
  top: rem(25),
  right: theme.sizes.appInlinePadding,
  userSelect: 'none',
  opacity: 1,
  transition: 'opacity 0.2s',

  ':hover': { opacity: 0.8 },
});

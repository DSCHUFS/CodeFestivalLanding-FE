import { globalStyle, style, keyframes } from '@vanilla-extract/css';

import { breakpoint } from '@/styles/responsive.css';
import { skeleton } from '@/styles/skeleton.css';
import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const flowAnim = keyframes({
  '0%': {
    backgroundPosition: '0% 0',
  },
  '100%': {
    backgroundPosition: '200% 0',
  },
});

export const root = style({
  ...theme.layouts.columnCenterX,
  height: `calc(100vh - ${theme.sizes.appHeaderHeight})`,
  zIndex: 0,
});

export const background = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(var(--vh, 1vh) * 100)',
  opacity: 0.7,
});

globalStyle(`${background} > img`, {
  objectFit: 'cover',
});

export const backgroundGradient = style({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: rem(156),
  background: `linear-gradient(180deg, transparent, ${theme.colors.black})`,
});

export const branding = style({
  marginTop: rem(28),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(28),
  fontWeight: 600,
  lineHeight: '100%',
  textAlign: 'center',

  ...breakpoint({
    mobile: { marginTop: rem(36), fontSize: rem(32) },
    tablet: { fontSize: rem(38) },
  }),
});

export const time = style({
  marginTop: rem(20),
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '100%',
  textAlign: 'center',

  ...breakpoint({
    mobile: { fontSize: rem(18) },
    tablet: { fontSize: rem(20) },
  }),
});

export const timeSkeleton = style([
  skeleton,
  {
    width: rem(184),
    height: rem(20),
    marginTop: rem(20),
  },
]);

export const registerLink = style({
  width: 'fit-content',
  paddingBlock: rem(13),
  paddingInline: rem(32),
  marginTop: rem(38),
  marginInline: 'auto',
  color: theme.colors.white,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
  textAlign: 'center',
  border: `${rem(2)} solid transparent`,
  borderRadius: rem(36),
  transition: 'color 0.3s ease, border-color 0.8s ease, background-color 0.3s ease',
  background: `
    linear-gradient(${theme.colors.black}, ${theme.colors.black}) padding-box,
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.25) 20%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.25) 80%
    ) border-box
  `,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  backgroundSize: '200% auto',
  animation: `${flowAnim} 6s linear infinite`,
  opacity: 0.9,
  cursor: 'pointer',

  ':hover': {
    color: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export const registerClosed = style({
  border: `${rem(2)} solid ${theme.colors.white}`,
  background: 'none',
  animation: 'none',
  opacity: 0.5,
  cursor: 'default',

  ':hover': {
    color: theme.colors.white,
    borderColor: theme.colors.white,
    backgroundColor: 'transparent',
  },
});

export const registerSkeleton = style([
  registerLink,
  skeleton,
  {
    width: rem(154),
    height: rem(44),
    padding: 0,
    borderColor: 'transparent',
    cursor: 'default',

    ':hover': {
      borderColor: 'transparent',
      backgroundColor: theme.colors.white20,
    },
  },
]);

export const souvenir = style({
  marginTop: rem(24),
  color: theme.colors.white80,
  fontFamily: 'var(--font-jetbrains)',
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '100%',
  textAlign: 'center',

  ...breakpoint({ mobile: { fontSize: rem(13) } }),
});

export const ci = style({
  width: rem(280),
  height: rem(280),
  marginTop: rem(32),
  marginInline: 'auto',

  ...breakpoint({
    mobile: { width: rem(312), height: rem(312) },
  }),
});

globalStyle(`${ci} > div`, {
  touchAction: 'auto !important',
});

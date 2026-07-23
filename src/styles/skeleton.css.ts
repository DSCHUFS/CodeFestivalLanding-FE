import { keyframes, style } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';
import { rem } from '@/utils/pxto';

const pulse = keyframes({
  '0%, 100%': {
    opacity: 0.35,
  },
  '50%': {
    opacity: 0.65,
  },
});

export const skeleton = style({
  backgroundColor: theme.colors.white20,
  borderRadius: rem(999),
  animation: `${pulse} 1.5s ease-in-out infinite`,

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

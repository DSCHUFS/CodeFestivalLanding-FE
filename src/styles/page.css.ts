import { style } from '@vanilla-extract/css';

import { rem } from '@/utils/pxto';

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: rem(16),
  marginBottom: rem(24),
});

export const title = style({
  fontFamily: 'var(--font-pretendard)',
  fontSize: `clamp(${rem(28)}, 4vw, ${rem(42)})`,
});

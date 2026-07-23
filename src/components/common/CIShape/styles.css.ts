import { style } from '@vanilla-extract/css';

export const canvas = style({
  width: '100%',
  height: '100%',
  opacity: 0,
  transition: 'opacity 500ms ease-out',

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const canvasReady = style({
  opacity: 1,
});

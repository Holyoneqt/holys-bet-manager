import { animate, state, style, transition, trigger } from '@angular/animations';

export type CollapseAnimationState = 'open' | 'closed';

export const collapseAnimation = trigger('collapse', [
  state(
    'open',
    style({
      height: '*',
      marginTop: '*',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      height: 0,
      opacity: 0,
      marginTop: 0,
      overflow: 'hidden',
    })
  ),
  state(
    'void',
    style({
      height: 0,
      opacity: 0,
      marginTop: 0,
      overflow: 'hidden',
    })
  ),
  transition('* => *', animate('.3s ease')),
]);
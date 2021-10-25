import { animate, group, query, style, transition, trigger } from '@angular/animations';

const TIMINGS = '.3s ease';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      })
    ]),
    group([
      query(':enter', [
        style({ opacity: '0' }),
        animate(TIMINGS, style({ opacity: '1' })),
      ]),
      query(':leave', [
        style({ opacity: '1' }),
        animate(TIMINGS, style({ opacity: '0' })),
      ]),
    ]),
  ]),
]);

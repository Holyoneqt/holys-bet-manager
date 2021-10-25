import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routerTransition } from './animations/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerTransition
  ],
})
export class AppComponent {
  public getRouteTransitionState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.transtitionState;
  }
}
